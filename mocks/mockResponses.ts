type MockProductResp = {
    [key: string]: object
}
type MockPriceResp = {
    [key: string]: object
}

export const priceResponses = {
    "R03670385": {
        prices: [
            {
                "Current Retail Price": "228.00",
            },
        ]
    },
    "365-83022651-AVENTUS": {
        prices: [
            {
                "Current Retail Price": "195.00",
            },
        ]
    },
    "R03681313": {
        prices: [
            {
                "Current Retail Price": "895.00",
            },
        ]
    },
    "118-2000644-377828BOW02": {
        prices: [
            {
                "Current Retail Price": "1000.00",
            },
        ]
    },
    "684-10145-3130523": {
        prices: [
            {
                "Current Retail Price": "545.00",
            },
        ]
    },
    "434-88064526-710541705": {
        prices: [
            {
                "Current Retail Price": "99.00",
            },
        ]
    },
    "default": {
        prices: [
            {
                "Current Retail Price": "189.00",
            },
        ]
    },
} as MockPriceResp;

export const productResponses = {
    "R03670385": {
        productDetails: [
            {
                "seoKey": "tom-ford-bitter-peach-eau-de-parfum-50ml_R03670385",
                "CatalogEntryView": [
                    {
                        "BrandName": "TOM FORD",
                        "ShortProductDescription": "Bitter Peach eau de parfum 50ml",
                    }
                ]
            }]
    },
    "365-83022651-AVENTUS": {
        productDetails: [
            {
                "seoKey": "creed-aventus-eau-de-parfum_365-83022651-AVENTUS",
                "CatalogEntryView": [
                    {
                        "BrandName": "CREED",
                        "ShortProductDescription": "Aventus eau de parfum",
                    }
                ]
            }]
    },
    "R03681313": {
        productDetails: [
            {
                "seoKey": "christian-louboutin-follies-strass-85-rete-suede-lame-versio_R03681313",
                "CatalogEntryView": [
                    {
                        "BrandName": "CHRISTIAN LOUBOUTIN",
                        "ShortProductDescription": "Follies Strass 85 rete suede lame versio",
                    }
                ]
            }]
    },
    "118-2000644-377828BOW02": {
        productDetails: [
            {
                "seoKey": "saint-laurent-monogram-leather-cross-body-bag_118-2000644-377828BOW02",
                "CatalogEntryView": [
                    {
                        "BrandName": "SAINT LAURENT",
                        "ShortProductDescription": "Monogram leather cross-body bag",
                    }
                ]
            }]
    },
    "684-10145-3130523": {
        productDetails: [
            {
                "seoKey": "christian-louboutin-iriza-100-veau-velours-black_684-10145-3130523",
                "CatalogEntryView": [
                    {
                        "BrandName": "CHRISTIAN LOUBOUTIN",
                        "ShortProductDescription": "Iriza 100 veau velours black",
                    }
                ]
            }]
    },
    "434-88064526-710541705": {
        productDetails: [
            {
                "seoKey": "polo-ralph-lauren-slim-fit-cotton-pique-polo-shirt_434-88064526-710541705",
                "CatalogEntryView": [
                    {
                        "BrandName": "POLO RALPH LAUREN",
                        "ShortProductDescription": "Slim-fit cotton-pique polo shirt",
                    }
                ]
            }]
    },
    "default": {
        productDetails: [
            {
                "seoKey": "hermes-hermessence-collection-ambre-narguile-eau-de-toilette-100ml_171-78031989-H20282",
                "CatalogEntryView": [
                    {
                        "BrandName": "DEFAULT PRODUCT",
                        "ShortProductDescription": "Default Product Description",
                    }
                ]
            }]
    },
} as MockProductResp
