# Radius Cart Builder Configuration Panel

This project showcases a React component built with Material-UI (MUI) to replicate a configuration panel based on Figma designs.

## Project Setup

1.  **Navigate to the project directory:**
    ```bash
    cd Desktop/Projects/radius-cart-builder
    ```

2.  **Install dependencies:**
    If you haven't already, or if you pull this project fresh, install the necessary node modules.
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the application in your default web browser, usually at `http://localhost:3000`.

## Key Features Implemented

*   Custom MUI theme anp.tsxpplied with specific brand colors (`primary: #EF0078`, `background: #1E1E1E`).
*   **eCommerce Toggle**: Controls the visibility of product-related settings.
    *   When OFF: Shows only Brand, PCTA, Layout accordions.
    *   When ON: Exposes Product Type, Multi-Retailer toggle, Retailer selection, and Show product retailer logo toggle.
*   **Product Type**: Radio button selection (KERV Kart, KERV Kart +, GWS).
*   **Multi-Retailer Toggle**:
    *   When OFF: Retailer selection is a single-select dropdown.
    *   When ON: Retailer selection becomes a multi-select dropdown (up to 3 retailers) with selected retailers displayed as Chips.
*   **Retailer Selection**: Dropdown to select one or more retailers.
*   **Show product retailer logo**: Toggle switch.
*   **Auto Update**: Display-only field.
*   Collapsible accordions for Brand, PCTA, and Layout sections.
*   Styled Save button.

## Figma References

*   **Kerv MUI Library**: [Figma Link](https://www.figma.com/design/SVISfl4fyOtuOvUVu4JNoT/Kerv-MUI?node-id=4662-14&t=ETAzCVxPViGZQ51z-1)
*   **Initial State (eCommerce OFF)**: [Figma Link](https://www.figma.com/design/14RGXKr2DDASGb9ZGKdOzP/Radius?node-id=70-39515&t=W5DiO3i2WHav3ue5-4)
*   **Secondary State (eCommerce ON, Single Retailer)**: [Figma Link](https://www.figma.com/design/14RGXKr2DDASGb9ZGKdOzP/Radius?node-id=62-25504&t=W5DiO3i2WHav3ue5-4)
*   **Third State (eCommerce ON, Multi-Retailer)**: [Figma Link](https://www.figma.com/design/14RGXKr2DDASGb9ZGKdOzP/Radius?node-id=72-39872&t=W5DiO3i2WHav3ue5-4)
*   **Multi-Selection Dropdown Sample**: [Figma Link](https://www.figma.com/design/14RGXKr2DDASGb9ZGKdOzP/Radius?node-id=69-38918&t=W5DiO3i2WHav3ue5-4)
