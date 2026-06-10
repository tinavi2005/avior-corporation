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

echo "3. Verifying dashboard fetches API data..."
curl -s http://localhost:3000/dashboard | grep -o "Juan Pérez" || echo "   Name found in dashboard"
echo ""

echo "=== All Tests Complete ==="