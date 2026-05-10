import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useCreateProduct,
    useUpdateProduct,
} from "../../core/hooks/useProducts";

import {
    productSchema,
    type ProductPayload,
    type ProductFormErrors,
} from "../schemas/product.schema";

interface UseProductFormProps {
    initialValues: ProductPayload;
    isEditing: boolean;
    id?: string;
}

export function useProductForm({
    initialValues,
    isEditing,
    id,
}: UseProductFormProps) {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<ProductPayload>(initialValues);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const [formErrors, setFormErrors] =
        useState<ProductFormErrors>({});

    const [apiError, setApiError] = useState("");


    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct(id ?? "");

    const isSaving =
        createProduct.isPending || updateProduct.isPending;

    function updateField<K extends keyof ProductPayload>(
        field: K,
        value: ProductPayload[K],
    ) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));

        setFormErrors((current) => ({
            ...current,
            [field]: undefined,
        }));
    }

    function validateForm(data: ProductPayload) {
        const result = productSchema.safeParse(data);

        if (result.success) return {};

        const errors = result.error.flatten().fieldErrors;

        return {
            name: errors.name?.[0],
            description: errors.description?.[0],
            price: errors.price?.[0],
            stockQuantity: errors.stockQuantity?.[0],
        };
    }

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setApiError("");

        const mutation = isEditing
            ? updateProduct
            : createProduct;

        mutation.mutate(formData, {
            onSuccess: () => navigate("/products"),
            onError: () => {
                setApiError("Não foi possível salvar o produto.");
            },
        });
    };

    return {
        formData,
        formErrors,
        apiError,
        isSaving,
        updateField,
        handleSubmit,
    };
}