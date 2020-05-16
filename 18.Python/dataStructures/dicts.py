chicken = {"name": "Lady Gray", "breed": "Silkie", "total_egg_count": 12, "egg_chart": {
    "M": True,
    "T": True,
    "W": True,
    "TH": True,
    "F": True,
    "S": False,
    "T": True,
},
    "coop_mates": ["Butters", "Stevie", "Henry"]
}


# for key in chicken.keys():
#     print(key)

# for value in chicken.values():
#     print(value)

# for pair in chicken.items():
#     print(pair)

for (k, v) in chicken.items():
    print(k , '---->', v)