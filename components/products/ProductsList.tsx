'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "./ProductCard"
import Container from "../layout/Container"

const laptops = [
  {
    name: "ProBook X1",
    description: "Powerful business laptop with enhanced security features",
    price: "$999",
    image: "/placeholder.svg?height=200&width=300",
    features: ["14\" FHD Display", "Intel i5 Processor", "8GB RAM", "256GB SSD"],
    badge: "Best Seller"
  },
  {
    name: "UltraSlim Y3",
    description: "Ultra-portable laptop for professionals on the go",
    price: "$1299",
    image: "/placeholder.svg?height=200&width=300",
    features: ["13\" 4K Display", "Intel i7 Processor", "16GB RAM", "512GB SSD"],
    badge: "New Arrival"
  },
  {
    name: "WorkStation Z5",
    description: "High-performance laptop for demanding tasks",
    price: "$1799",
    image: "/placeholder.svg?height=200&width=300",
    features: ["15.6\" 4K Display", "Intel Xeon Processor", "32GB RAM", "1TB SSD"],
    badge: "Pro Choice"
  },
  {
    name: "EcoBook E2",
    description: "Eco-friendly laptop with long battery life",
    price: "$899",
    image: "/placeholder.svg?height=200&width=300",
    features: ["14\" FHD Display", "AMD Ryzen 5", "8GB RAM", "512GB SSD"],
    badge: "Eco-Friendly"
  }
]

export default function ProductsList() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ">
      <Container>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold ">
            Featured Laptop Products
          </h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-500 mx-auto">
            Explore our range of high-performance laptops for your business needs
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {laptops.map((laptop, index) => (
            <motion.div 
              key={laptop.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <ProductCard laptop={laptop}/>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

