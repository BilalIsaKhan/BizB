docker build --no-cache -t bizb:example-storefront .
docker tag bizb:example-storefront codistan/bizb:example-storefront
docker push codistan/bizb:example-storefront
git add .
git commit -m "add: release script"
git push