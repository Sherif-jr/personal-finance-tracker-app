# Personal Finance Tracker App

## Overview

This project is a **Personal Finance Tracker App** built using React Native with **Expo**. The app allows users to track their income and expenses, view a list of past transactions, and see a monthly summary with a breakdown of expenses vs income.

## Features

1. **Add Transactions**:
   - Users can add transactions with details such as type (income/expense), amount, category, date, and description.
2. **Transaction List**:
   - Displays a list of added transactions with sorting and filtering options based on date,amount, type and category.
3. **Summary View**:
   - Shows a summary of total income and expenses for the current month.
   - Visual representation of expenses by category (e.g., pie chart).
4. **Data Persistence**:
   - Transaction data is saved locally using AsyncStorage, ensuring data is retained even when the app is closed and reopened.
5. **Dynamic theme**:
   - Dynamic light/dark theme based on the device theme.
6. **Simple UI and good UX**

## Requirements

- **React Native**: The app is built using React Native for cross-platform compatibility on iOS and Android.
- **State Management**: Functional components and hooks are used for managing state.
- **AsyncStorage**: Local data storage is handled by AsyncStorage, allowing persistent data management.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sherif-jr/personal-finance-tracker-app.git
   cd personal-finance-tracker-app
   ```
2. **Install Dependencies**

```bash
yarn
```

Or

```bash
yarn install
```

3. **Run on Expo Go**

```bash
yarn start
```

Or with tunnel

```bash
npx expo start --tunnel
```
