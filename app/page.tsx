"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.scss"
import CountryList from "@/components/country-list"
import CountryInfo from "@/components/country-info"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const data = await response.json()

        // Сортировка стран по алфавиту
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common))

        setCountries(sortedCountries)
        setLoading(false)
      } catch (error) {
        console.error("Ошибка при загрузке стран:", error)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <h2>Список стран</h2>
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <CountryList
              countries={countries}
              onSelectCountry={handleCountrySelect}
              selectedCountry={selectedCountry}
            />
          )}
        </div>
        <div className={styles.rightPanel}>
          {selectedCountry ? (
            <CountryInfo country={selectedCountry} allCountries={countries} />
          ) : (
            <div className={styles.noSelection}>
              <p>Выберите страну</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
