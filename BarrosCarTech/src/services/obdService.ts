export async function connectToOBD(): Promise<{ id: string }> {
 
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: "1234-OBD" }), 1000)
  );
}
