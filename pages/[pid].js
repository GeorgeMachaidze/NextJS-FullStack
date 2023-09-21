import { Fragment } from "react";
import path from "path";

import fs from "fs/promises";

function ProductPage(props) {
  const { loadedProducts } = props;
  return (
    <Fragment>
      <h1>{loadedProducts.title}</h1>
      <p>{loadedProducts.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProducts: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
}

export default ProductPage;
