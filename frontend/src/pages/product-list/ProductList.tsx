import { useState } from "react";
// Icons
import { PackagePlus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "../../shared/components/animation/FadeIn";
// Hooks
import { useProducts } from "../../core/hooks/useProducts";
// Styles
import styles from "./ProductList.module.css";
// Components
import { Button } from "../../shared/components/button/Button";
import { Header } from "../../shared/components/header/Header";
import { PageContent } from "../../shared/components/page-content/PageContent";
import { SearchBar } from "../../shared/components/search-bar/SearchBar";
import { StateFeedback } from "../../shared/components/state-feedback/StateFeedback";
import { ProductDataTable } from "./components/ProductDataTable";

export function ProductList() {
  const [submittedSearch, setSubmittedSearch] = useState<string>("");

  const {
    data: products = [],
    isError,
    isLoading,
  } = useProducts(submittedSearch);

  return (
    <motion.main
      className={styles["product-list"]}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles["product-list__container"]}>
        <FadeIn direction="down">
          <Header>
            <div>
              <h1 className={styles["product-list__title"]}>
                <PackagePlus aria-hidden="true" size={35} />
                Inventário
              </h1>
              <h2 className={styles["product-list__subtitle"]}>Produtos</h2>
              <p className={styles["product-list__description"]}>
                Consulte e mantenha o cadastro de produtos.
              </p>
            </div>
            <SearchBar
              placeholder="Buscar produto..."
              onSearch={setSubmittedSearch}
              onClear={() => setSubmittedSearch("")}
              isLoading={isLoading}
            />
          </Header>
        </FadeIn>

        <PageContent>
          <FadeIn>
            <div className={styles["product-list__actions"]}>
              <Button
                ariaLabel="Novo produto"
                icon={<Plus aria-hidden="true" size={17} />}
                label="Novo produto"
                mode="solid"
                to="/products/new"
                variant="secondary"
              />
            </div>
          </FadeIn>

          {isLoading && (
            <FadeIn>
              <StateFeedback variant="loading">
                Carregando produtos...
              </StateFeedback>
            </FadeIn>
          )}

          {isError && (
            <FadeIn>
              <StateFeedback variant="error">
                Não foi possível carregar os produtos.
              </StateFeedback>
            </FadeIn>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <FadeIn delay={0.2}>
              <StateFeedback
                variant="empty"
                title={
                  submittedSearch
                    ? "Nenhum produto encontrado"
                    : "Nenhum produto cadastrado"
                }
                description={
                  submittedSearch
                    ? "Tente buscar por outro termo."
                    : "Comece adicionando o primeiro produto ao inventário."
                }
              />
            </FadeIn>
          )}

          {products.length > 0 && (
            <FadeIn delay={0.2}>
              <ProductDataTable products={products} />
            </FadeIn>
          )}
        </PageContent>
      </div>
    </motion.main>
  );
}
