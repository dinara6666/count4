import Image from "next/image"
import styles from "./country-info.module.scss"

interface CountryInfoProps {
  country: any
  allCountries: any[]
}

export default function CountryInfo({ country, allCountries }: CountryInfoProps) {
  // Получаем названия граничащих стран
  const getBorderCountries = () => {
    if (!country.borders || country.borders.length === 0) {
      return ["Нет граничащих стран"]
    }

    return country.borders.map((border) => {
      const borderCountry = allCountries.find((c) => c.cca3 === border)
      return borderCountry ? borderCountry.name.common : border
    })
  }

  // Форматирование числа населения
  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat("ru-RU").format(population)
  }

  const borderCountries = getBorderCountries()

  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.countryName}>{country.name.common}</h1>

      <div className={styles.flagContainer}>
        <Image
          src={country.flags.svg || "/placeholder.svg"}
          alt={`Флаг ${country.name.common}`}
          width={300}
          height={150}
          className={styles.flag}
        />
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <h3>Столица:</h3>
          <p>{country.capital?.[0] || "Нет данных"}</p>
        </div>

        <div className={styles.infoItem}>
          <h3>Население:</h3>
          <p>{formatPopulation(country.population)} чел.</p>
        </div>

        <div className={styles.infoItem}>
          <h3>Регион:</h3>
          <p>{country.region || "Нет данных"}</p>
        </div>

        <div className={styles.infoItem}>
          <h3>Площадь:</h3>
          <p>{country.area ? `${formatPopulation(country.area)} км²` : "Нет данных"}</p>
        </div>
      </div>

      <div className={styles.bordersSection}>
        <h3>Граничит с:</h3>
        <ul className={styles.bordersList}>
          {borderCountries.map((borderName, index) => (
            <li key={index} className={styles.borderItem}>
              {borderName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
