import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card-component";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <span className="title">{title.toUpperCase()}</span>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
