import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import useProducts from "../hooks/useProducts.js";
import Product from "./Product.js";
import Bounce from "react-reveal/Bounce";

const Products = () => {
  const products = useProducts();
  const count = products.length;

  return (
    <>
      {!count ? (
        <div className="text-center my-5 private-spinner py-5">
          <Spinner variant="danger" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Container className="mb-5">
          <Bounce top cascade>
            <h2 className="text-center text-uppercase mt-5 mb-4 feature">
              Popular Products
            </h2>
            <p
              style={{ maxWidth: "650px" }}
              className="text-center mx-auto mt-3"
            >
              {" "}
              A superb collection of great and comfortable items of foods & other household items to make your life much easier.
            </p>
          </Bounce>
          <Row>
            {products?.map((product) => (
              <Product kay={product._id} product={product} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Products;
