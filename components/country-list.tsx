"use client"

import { useState } from "react"
import styles from "./country-list.module.scss"

interface CountryListProps {
  countries: any[]
  onSelectCountry: (country: any) => void
  selectedCountry: any
}

export default function CountryList({ countries, onSelectCountry, selectedCountry }: CountryListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className={styles.listContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск страны..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.list}>
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            className={`${styles.countryItem} ${selectedCountry?.cca3 === country.cca3 ? styles.selected : ""}`}
            onClick={() => onSelectCountry(country)}
          >
            {country.name.common}
          </div>
        ))}
      </div>
    </div>
  )
}
