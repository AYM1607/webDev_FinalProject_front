import { ulid } from "ulid";

const baseUrl = "https://boiling-wildwood-80394.herokuapp.com";

export async function createProduct(productObject, image) {
  const imageUrl = await uploadImage(image);
  const payload = { ...productObject, imageUrl };

  const params = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  const response = await fetch(`${baseUrl}/products`, params);
  if (!response.ok) {
    throw new Error("Could not create product");
  }
}

export async function getTopProducts() {
  const url = new URL(`${baseUrl}/products`);
  const searchParams = { newest: "true" };
  url.search = new URLSearchParams(searchParams).toString();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch products");
  }
  return await response.json();
}

export async function searchProducts(name, category, minRange, maxRange) {
  const url = new URL(`${baseUrl}/products`);
  const searchParams = {
    ...(!!name && { name }),
    ...(!!category && { category }),
    ...(!!minRange && { minRange: Number(minRange) * 100 }),
    ...(!!maxRange && { maxRange: Number(maxRange) * 100 })
  };
  url.search = new URLSearchParams(searchParams).toString();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch products");
  }
  return await response.json();
}

export async function register(values) {
  const params = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  };
  const response = await fetch(`${baseUrl}/users`, params);
  if (!response.ok) {
    throw new Error("Could not register user");
  }
}

/**
 * Uploads an image to S3 and returns the static url to it.
 *
 * @param {BinaryType} file
 * @returns {Promise<string>}
 */
async function uploadImage(file) {
  const filename = `${ulid()}.png`;
  const url = new URL(`${baseUrl}/s3-signed-url`);
  const params = { imageName: filename };
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  const presignedUploadUrl = (await response.json()).url;

  try {
    await fetch(
      new Request(presignedUploadUrl, {
        method: "PUT",
        body: file,
        headers: new Headers({
          "Content-Type": "image/*"
        })
      })
    );
    return `https://final-project-web-dev.s3.amazonaws.com/images/${filename}`;
  } catch (e) {
    console.log(e);
  }
}
