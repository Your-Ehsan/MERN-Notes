const HomeLoader = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes/allnotes`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYmRiMTAzY2JiZWZiNjNhOTFjMGRlIn0sImlhdCI6MTY5MDAzMjkxMn0.bI9vU-JNIKI5CRTZY872viQeccQ-sVMzNFpRqBurK8Q",
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },
      }),
      json = await response.json();
    if (!response.ok) {
      throw {
        message: "Failed to fetch notes",
        statusText: response.statusText,
        status: response.status,
        response,
      };
    }
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { HomeLoader };
