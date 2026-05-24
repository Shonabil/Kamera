async function testProxyStream() {
  const url = 'http://localhost:3000/api/dcc?port=5514&path=live';
  console.log(`Fetching from proxy: ${url}...`);
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    console.log(`Status: ${res.status}`);
    console.log("Headers:");
    res.headers.forEach((val, key) => console.log(`  ${key}: ${val}`));
    
    const reader = res.body.getReader();
    const { value, done } = await reader.read();
    if (value) {
      console.log(`Successfully received stream chunk of size ${value.length} bytes through proxy!`);
    } else {
      console.log("No data received from stream.");
    }
  } catch (err) {
    console.error("Proxy stream failed:", err.message);
  }
  process.exit(0);
}

testProxyStream();
