#!/bin/bash

echo "=== Testing Vale Integrador ==="
echo ""

echo "1. Testing API..."
echo "   - Health:"
curl -s http://localhost:5555/api/v1/health | head -1
echo ""
echo "   - Students:"
curl -s http://localhost:5555/api/v1/students | head -c 100
echo "..."
echo ""

echo "2. Testing Web..."
echo "   - Home:"
curl -s -o /dev/null -w "   HTTP %{http_code}\n" http://localhost:3000/
echo "   - Login:"
curl -s -o /dev/null -w "   HTTP %{http_code}\n" http://localhost:3000/login
echo "   - Dashboard:"
curl -s -o /dev/null -w "   HTTP %{http_code}\n" http://localhost:3000/dashboard
echo ""

echo "3. Verifying dashboard responds with HTML..."
HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/dashboard)
if [ "$HTTP" = "307" ] || [ "$HTTP" = "200" ]; then
  echo "   Dashboard HTTP $HTTP (redirect to login or already authenticated)"
else
  echo "   Dashboard unexpected: HTTP $HTTP"
fi
echo ""

echo "=== All Tests Complete ==="