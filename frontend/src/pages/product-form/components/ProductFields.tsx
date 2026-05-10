// Icons
import { Save, X } from "lucide-react";
// Types
import type {
  ProductPayload,
  ProductFormErrors,
} from "../../../core/schemas/product.schema";
// Styles
import styles from "./ProductFields.module.css";
// Components
import { Button } from "../../../shared/components/button/Button";
import { Input } from "../../../shared/components/input/Input";
import { Alert } from "../../../shared/components/alert/Alert";
// Utils
import { parseCurrencyInput, currencyMask } from "../../../core/utils/currency";

interface ProductFieldsProps {
  formData: ProductPayload;
  formErrors: ProductFormErrors;
  apiError: string;
  isSaving: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  onUpdateField: <K extends keyof ProductPayload>(
    field: K,
    value: ProductPayload[K],
  ) => void;
}

export function ProductFields({
  formData,
  formErrors,
  apiError,
  isSaving,
  onSubmit,
  onCancel,
  onUpdateField,
}: ProductFieldsProps) {
  return (
    <form className={styles["product-fields__body"]} onSubmit={onSubmit}>
      {apiError && (
        <Alert
          type="danger"
          isOpen={!!apiError}
          title="Erro ao salvar produto"
          description={apiError}
          confirmText="Ok"
          onConfirm={() => onCancel()}
          onCancel={() => onCancel()}
        />
      )}

      <Input
        label="Nome"
        type="text"
        placeholder="Ex: Camiseta Polo"
        value={formData.name}
        onChange={(e) => onUpdateField("name", e.target.value)}
        error={formErrors.name}
      />

      <Input
        label="Descrição"
        type="textarea"
        placeholder="Descreva o produto..."
        value={formData.description}
        onChange={(e) => onUpdateField("description", e.target.value)}
        error={formErrors.description}
      />

      <div className={styles["product-fields__grid"]}>
        <Input
          label="Preço"
          type="text"
          mask="currency"
          value={currencyMask(formData.price)}
          onChange={(e) =>
            onUpdateField("price", parseCurrencyInput(e.target.value))
          }
          error={formErrors.price}
        />

        <Input
          label="Estoque"
          type="number"
          min="0"
          step="1"
          value={formData.stockQuantity}
          onChange={(e) =>
            onUpdateField("stockQuantity", Number(e.target.value))
          }
          error={formErrors.stockQuantity}
        />
      </div>

      <div className={styles["product-fields__actions"]}>
        <Button
          icon={<X aria-hidden="true" size={17} />}
          ariaLabel="Cancelar"
          variant="danger"
          mode="outlined"
          label="Cancelar"
          onClick={() => onCancel()}
        />

        <Button
          icon={<Save aria-hidden="true" size={17} />}
          label="Salvar"
          variant="primary"
          type="submit"
          isLoading={isSaving}
          disabled={isSaving}
        />
      </div>
    </form>
  );
}
