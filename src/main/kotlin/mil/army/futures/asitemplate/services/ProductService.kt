package mil.army.futures.asitemplate.services

import mil.army.futures.asitemplate.Product
import mil.army.futures.asitemplate.repositories.ProductRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository) {
    fun addProduct(product: String): Product {
        return productRepository.save(Product(name = product, quantity = 0))
    }

    fun getProducts(): List<Product> {
        return productRepository.findAll()
    }

    fun addQuantity(productId: Long, quantity: Int): Product {
        val updatedProduct = productRepository.findByIdOrNull(productId) ?:  error("Product does not exist")
        return productRepository.save(updatedProduct.copy(quantity = quantity))
    }
}