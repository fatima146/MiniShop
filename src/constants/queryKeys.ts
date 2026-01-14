// Query keys voor TanStack Query caching
// Elke query heeft een unieke key om data te identificeren
export const queryKeys = {
  products: {
    // Key voor alle producten: ["products"]
    all: ["products"] as const,

    // Key voor 1 product: ["products", 5] (bijvoorbeeld)
    // Functie omdat id dynamisch is
    detail: (id: number) => ["products", id] as const,
  },
};
