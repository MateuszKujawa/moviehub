🎬 MovieHub

MovieHub to nowoczesna aplikacja webowa stworzona na potrzeby zadania rekrutacyjnego. Jej głównym celem jest dostarczenie użytkownikom przejrzystego i intuicyjnego sposobu na przeglądanie filmów oraz ich kategorii.

📌 Główne funkcje aplikacji

Przegląd filmów i kategorii – użytkownik może przeglądać dostępne filmy i ich kategorie.

Szczegółowe informacje o filmie – po kliknięciu w wybrany film użytkownik zostaje przeniesiony na stronę z rozszerzonymi informacjami.

Gdzie obejrzeć? – aplikacja wskazuje dostępne platformy streamingowe, na których można zobaczyć dany film.

Zwiastuny filmów – możliwość obejrzenia oficjalnych zwiastunów bezpośrednio na stronie MovieHub.

Obsada i ekipa filmowa – użytkownik może dowiedzieć się, kto wystąpił w filmie oraz kto go reżyserował.

Dodatkowe informacje – czas trwania, opis fabuły, oceny oraz inne istotne szczegóły.

Galeria zdjęć – możliwość przeglądania kadrów i zdjęć z filmu.

MovieHub to intuicyjna i estetyczna platforma, która dostarcza pełne doświadczenie kinowe w jednym miejscu. 🎥🍿

________________________________________________________________________________________________________________________________________________________
________________________________________________________________________________________________________________________________________________________

## 🛠 Wymagania

Przed rozpoczęciem pracy upewnij się, że masz zainstalowane:

- [Node.js](https://nodejs.org/) (zalecana wersja: LTS)
- [npm](https://www.npmjs.com/) lub [yarn](https://yarnpkg.com/)
- Next.js (`npm install next` lub `yarn add next`)

## 📥 Instalacja

Najpierw sklonuj repozytorium:

```sh
gh repo clone MateuszKujawa/moviehub
cd moviehub
```

Zainstaluj zależności:

Jeśli używasz `npm`:

```sh
npm install
```

Jeśli używasz `yarn`:

```sh
yarn install
```

## 🚀 Uruchomienie aplikacji

Aby uruchomić aplikację w trybie deweloperskim:

```sh
npm run dev
```

Lub, jeśli używasz `yarn`:

```sh
yarn dev
```

Aplikacja automatycznie otworzy się w przeglądarce pod adresem:

```
http://localhost:3000
```

## 📦 Budowanie wersji produkcyjnej

Jeśli chcesz przygotować aplikację do produkcji:

```sh
npm run build
```

Aby uruchomić gotowy build:

```sh
npm run start
```

## ✅ Lintowanie kodu

Aby sprawdzić kod pod kątem błędów:

```sh
npm run lint
```

## 📁 Struktura katalogów

```
.
├── public/          # Statyczne pliki (obrazy, ikony, itp.)
├── pages/           # Strony Next.js
│   ├── index.tsx    # Strona główna
│   ├── _app.tsx     # Główny komponent aplikacji
│   ├── movie/
|      ├── [id].tsx  # Strona szczegółów filmu - wykorzystująca dynamiczny routing
├── components/      # Komponenty React
├── styles/          # Pliki Tailwind CSS & Style nprogress
├── package.json     # Zależności i skrypty
├── next.config.js   # Konfiguracja Next.js
├── tsconfig.json    # Konfiguracja TypeScript
├── tailwind.config.js    # Konfiguracja Tailwind CSS
```

## 🔑 Konfiguracja zmiennych środowiskowych

Stwórz plik `.env.local` w katalogu głównym i dodaj:

```sh
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_TMDB_API_KEY=tajnykluczapi
```
