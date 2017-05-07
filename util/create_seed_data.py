#!/usr/bin/env python

from functools import reduce

import requests
from bs4 import BeautifulSoup

OFFICE_CHAIR_URL = 'http://www.ikea.com/au/en/catalog/categories/departments/workspaces/20652/'

response = requests.get(OFFICE_CHAIR_URL)
soup = BeautifulSoup(response.text, 'html.parser')
chairs = [
    {
        'name': chair_el.find(class_='productTitle').string.strip(),
        'description': chair_el.find(class_='productDesp').string.strip(),
        'image_url': 'http://www.ikea.com{}'.format(chair_el.find('img')['src']),
        'price': next(chair_el.find(class_='price').stripped_strings).replace('$', ''),
    }
    for chair_el in soup.find_all(class_='product')
]

formatted_chairs = [
    '''\
- model: shop.Product
  pk: {pk}
  fields:
    name: {name}
    description: {description}
    image_url: {image_url}
    price: {price}
'''.format(**dict(chair, pk=i + 1))
    for i, chair in enumerate(chairs)
]

print(reduce(lambda acc, chair: acc + chair, formatted_chairs, ''))
