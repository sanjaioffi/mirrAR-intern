
# mirrAR Backend Task - E-commerce REST API

Welcome to EcomAPI, a robust REST API for your e-commerce needs. This project is crafted with Node.js, ensuring a powerful and scalable solution for managing your products and variants.


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/download) Latest LTS Version: 20.11.0 (includes npm 10.2.4)
- Install [Postman](https://www.postman.com/downloads/) for accessing the collection.


# Getting started
- Clone the repository
```
git clone https://github.com/sanjaioffi/mirrAR-intern.git
```


*Note:  Please ensure that the project is not a subfolder within your repository. The root of the repository should contain the project files directly. This folder structure is designed for a straightforward project setup, and placing it in a subfolder may affect the functionality and intended organization.*


- Install dependencies
After cloning/downloading the source code, change directory to project folder ( project root folder ).
Run following command:
```
npm install
```

This command will install all the required dependancies.

- Build and run the project
```
npm start
```

> [!NOTE]
> Ensure that the server is live when using Postman for testing API endpoints. The server acts as the backbone, responding to incoming requests and allowing Postman to simulate interactions with your API.*

> [!TIP]
> To confirm the server is live, execute the `npm start` command from your project's root directory. This initiates the server, and you should see a confirmation message or status indication in your terminal. This step is crucial for accurate testing using Postman, as it relies on a responsive server to process requests.




- API Documentation
  
![Logo](https://cdn.cookielaw.org/logos/70564414-548a-4286-8ad7-04d95b172a08/e26443c0-68d1-47c8-b8fc-9bc765da2e95/3a159462-db70-43cf-a27d-f602a6baed44/pm-logo-horiz.png)

  Postman Documentation : https://documenter.getpostman.com/view/27773024/2s9Yyv9zXH#cb0108b1-8d9e-4cc5-8096-db237174cc0e
  ## Run in Postman

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/27773024-bd1fd0f1-a2bb-4651-9f74-a6606befb563?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D27773024-bd1fd0f1-a2bb-4651-9f74-a6606befb563%26entityType%3Dcollection%26workspaceId%3D11c69bfb-4c5f-4b51-a347-2091cc1cee94)

*Note: Click the "Run in Postman" button above to fork the collection. After forking, open the collection in your [Postman](https://www.postman.com/downloads/) app*

- Test the project
```
npm test
```

# Database Design: Separation of Products and Variants
> [!IMPORTANT]
> **Decision:**
> - *Separation:* Products and variants stored in distinct collections.

**Rationale:**

## 1. Flexibility and Normalization:
   - Allows for handling products without variants or with distinct attributes.
   - Aligns with normalization principles, minimizing redundancy.

## 2. Scalability:
   - Permits independent optimization and scaling of each collection.
   - Enhances resource allocation for anticipated ecommerce store growth.

## 3. Simplified Queries:
   - Facilitates straightforward queries, optimizing information retrieval.
   - Balances complexity for efficient querying.


**Development and Maintenance:**
   - Despite introducing some complexity, chosen for scalability and query optimization benefits.

> [!NOTE]
> This design supports a robust, scalable ecommerce database tailored to project needs.

<h1 align="center"> API Endpoints </h1>



# Products




1. **API to create a new product**
   - Method:`POST`
   - URL: `http://localhost:3000/api/v1/products/`
   - Body (JSON):

     ```json
     {
     
     "name": "MEENAZ Stainless Steel Stylish adjustable proposal Couple band thumb Silver Platinum Blue combo chain Finger Ring for Men Mens couples gents unisex Boys Boyfriend MEN RINGS-AM053",
     "description": "Metal type - Black Rhodium Plated Silver",
     "price":156
     
     }
     ```

2. **API to get a specific product by ID**
   - Method: `GET`
   - URL: `http://localhost:3000/api/v1/products/{product id}`
     (Get the ID from the MongoDB database of an existing product.)
     

3. **API to get all products**
   - Method: `GET`
   - URL: `http://localhost:3000/api/v1/products/`



4. **API to update a product by ID**
   - Method:` PUT`
   - URL: `http://localhost:3000/api/v1/products/{product id}`
     (Get the ID from the MongoDB database of an existing product.)
   - Body (JSON):

     ```json
     {
     
     "name": "MEENAZ Stainless Steel Stylish adjustable proposal Couple band thumb Silver Platinum Blue combo chain Finger Ring for Men Mens couples gents unisex Boys Boyfriend MEN RINGS-AM053",
     "description": "Metal type - Black Rhodium Plated Silver",
     "price":156
     
     }
     ```

5. **API to delete a product by ID**
   - Method: `DELETE`
   - URL: `http://localhost:3000/api/v1/products/{product id}`
     (Get the ID from the MongoDB database of an existing product.)

6. **API to search for products by name, description, or variant name**
   - Method: GET
   - URL: `http://localhost:3000/api/v1/products/{keyword}`
     (keyword to find the product.)


# Variants


1. **API to create a new Variant**
   - Method:`POST`
   - URL: `http://localhost:3000/api/v1/variants/`
   - Body (JSON):

     ```json
      {
            "productId": "65bbe290cb01cc9414397133",
            "name": "MEENAZ Stainless Steel Stylish adjustable proposal Couple band thumb Silver Platinum Blue combo chain Finger Ring for Men Mens couples gents unisex Boys Boyfriend MEN RINGS-AM053 SILVER BLACK",
            "sku": "AA-1",
            "additionalPrice": 50,
            "stockCount": 100
     }
     ```

2. **API to update a Variant by ID**
   - Method:` PUT`
   - URL: `http://localhost:3000/api/v1/variants/{variant id}`
     (Get the ID from the MongoDB database of an existing variant.)
   - Body (JSON):

     ```json
      {
            "productId": "65bbe290cb01cc9414397133",
            "name": "MEENAZ Stainless Steel Stylish adjustable proposal Couple band thumb Silver Platinum Blue combo chain Finger Ring for Men Mens couples gents unisex Boys Boyfriend MEN RINGS-AM053 SILVER BLACK",
            "sku": "AA-1",
            "additionalPrice": 50,
            "stockCount": 100
      }
     ```

3. **API to delete a variant by ID**
   - Method: `DELETE`
   - URL: `http://localhost:3000/api/v1/varinats/{variant id}`
     (Get the ID from the MongoDB database of an existing variant.)


