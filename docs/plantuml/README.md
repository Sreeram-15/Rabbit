# Rabbit PlantUML Behavioral Diagrams

This directory contains a separate PlantUML source file for each behavioral diagram in `docs/behavioral-diagrams.md`.

| # | Diagram | PlantUML source |
| --- | --- | --- |
| 1 | Use Case Diagram | `01-use-case-diagram.puml` |
| 2 | Sequence: Registration, Login, Protected Access, and Guest Cart Merge | `02-sequence-registration-login-cart-merge.puml` |
| 3 | Sequence: Catalog Browsing, Product Details, and Cart Management | `03-sequence-catalog-cart-management.puml` |
| 4 | Sequence: Checkout, PayPal Payment, Order Finalization, and Customer Order Views | `04-sequence-checkout-payment-finalization.puml` |
| 5 | Sequence: Admin Management and Image Upload | `05-sequence-admin-management-image-upload.puml` |
| 6 | Activity: Customer Shopping and Checkout | `06-activity-customer-shopping-checkout.puml` |
| 7 | Activity: Authentication and Authorization | `07-activity-authentication-authorization.puml` |
| 8 | Activity: Admin Operations | `08-activity-admin-operations.puml` |

Each file is self-contained and starts with `@startuml` and ends with `@enduml`, so it can be copied directly into a PlantUML renderer.

## Rendered SVG visualizations

Rendered SVG files are available in `docs/plantuml/rendered/`, and `docs/diagram-visualizations.md` embeds all of them on one page for quick viewing.
