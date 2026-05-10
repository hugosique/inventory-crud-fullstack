// React
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
// Hooks
import { useProduct } from "../../core/hooks/useProducts";
import { useProductForm } from "../../core/hooks/useProductsForm";
// Icons
import { ArrowLeft } from "lucide-react";
// Animation
import { motion } from "framer-motion";
// Types
import type { ProductPayload } from "../../core/schemas/product.schema";
// Styles
import styles from "./ProductForm.module.css";
// Components (Shared)
import { Header } from "../../shared/components/header/Header";
import { PageContent } from "../../shared/components/page-content/PageContent";
// Components (Features)
import { ProductFields } from "./components/ProductFields";

export function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditing = Boolean(id);
  const productQuery = useProduct(id);

  const initialValues = useMemo<ProductPayload>(
    () =>
      productQuery.data ?? {
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
      },
    [productQuery.data],
  );

  const form = useProductForm({
    initialValues,
    isEditing,
    id,
  });

  return (
    <motion.main
      className={styles["product-form"]}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles["product-form__container"]}>
        <Header>
          <div className={styles["product-form__header-inner"]}>
            <Link className={styles["product-form__back-link"]} to="/products">
              <ArrowLeft aria-hidden="true" size={16} />
              Voltar
            </Link>
            <h1 className={styles["product-form__title"]}>
              {isEditing ? "Editar produto" : "Novo produto"}
            </h1>
            <p className={styles["product-form__subtitle"]}>
              Preencha os dados principais do produto.
            </p>
          </div>
        </Header>

        <PageContent>
          {productQuery.isLoading && (
            <div
              className={`${styles["product-form__state-box"]} ${styles["product-form__state-box--loading"]}`}
            >
              Carregando produto...
            </div>
          )}

          {productQuery.isError && (
            <div
              className={`${styles["product-form__state-box"]} ${styles["product-form__state-box--error"]}`}
            >
              Não foi possível carregar o produto.
            </div>
          )}

          {(!isEditing || productQuery.isSuccess) && (
            <ProductFields
              formData={form.formData}
              formErrors={form.formErrors}
              apiError={form.apiError}
              isSaving={form.isSaving}
              onSubmit={form.handleSubmit}
              onUpdateField={form.updateField}
              onCancel={() => navigate("/products")}
            />
          )}
        </PageContent>
      </div>
    </motion.main>
  );
}
