import subprocess
import os

codes = [
    ('4482', 'lucca-libri'),
    ('3795', 'pensieri-belli'),
    ('8081', 'il-collezionista'),
    ('2593', 'brucaliffo'),
    ('6369', 'dodo'),
    ('9184', 'cappellaio-matto'),
    ('5834', 're-cuori'),
    ('7381', 'regina-cuori'),
    ('8462', 'pinco-panco'),
    ('9026', 'fiori'),
    ('5499', 'tricheco-carpentiere'),
    ('1638', 'humpty-dumpty'),
#    ('2836', 'stregatto'),
]

for code, place in codes:
    defs = {'code': code, 'place': place}
    os.system('qrencode -t PNG -s 10 -o qr%(code)s-%(place)s.png https://alice.wvoce.it/#/qrcode/%(code)s' % defs)
