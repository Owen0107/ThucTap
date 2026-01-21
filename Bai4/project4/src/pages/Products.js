import React, { useState, useMemo, useRef, useCallback } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('default');
  
  // Sử dụng useRef để tham chiếu đến các elements
  const searchInputRef = useRef(null);
  const productsGridRef = useRef(null);

  const categories = ['Tất cả', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'Tất cả') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  // Sử dụng useCallback để tối ưu hóa các hàm xử lý sự kiện
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setSelectedCategory(cat);
    // Scroll đến grid sản phẩm khi thay đổi category
    productsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    searchInputRef.current?.focus();
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSortBy('default');
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Sản phẩm của chúng tôi</h1>
          <p className="page-subtitle">Khám phá bộ sưu tập công nghệ đỉnh cao</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={handleClearSearch}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Danh mục:</label>
              <div className="category-buttons">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm</p>
          {(searchTerm || selectedCategory !== 'Tất cả' || sortBy !== 'default') && (
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              🔄 Đặt lại bộ lọc
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid" ref={productsGridRef}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Không tìm thấy sản phẩm</h3>
            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              🔄 Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
