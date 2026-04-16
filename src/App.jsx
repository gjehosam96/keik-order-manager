import { useState, useEffect, useRef } from "react";

// ── CONSTANTS (compressed) ───────────────────────────────
const USERS=[{username:"gjehosam",password:"Cindy510",name:"Admin",isMaster:true},{username:"Yona",password:"keik111",name:"Karyawan 1"},{username:"Meyla",password:"keik222",name:"Karyawan 2"},{username:"Dona",password:"keik333",name:"Karyawan 3"},{username:"Suci",password:"keik444",name:"Karyawan 4"},{username:"karyawan5",password:"keik555",name:"Karyawan 5"}];
const LAPIS=[{name:"Lapis Bulat",mentega:["Butter","Wisman"]},{name:"Lapis Persegi",mentega:["Butter","Wisman"]},{name:"Lapis 11x22",mentega:["Butter","Wisman"]},{name:"Lapis 10x10",mentega:["Butter"]},{name:"Lapis Mini Bites",mentega:["Butter"]},{name:"Lapis Mix 4 Rasa",mentega:["Butter"]}];
const KERING=["Nastar Wisman","Kastengel","Lidah Kucing","Putri Salju","Semprit Mawar","Sagu Keju"];
const RASA=["Original","Plum","Keju","Coklat","Almond","Nanas"];
const PENGIRIMAN=["Pickup","TIKI","Instant"];
const BOX_OPTIONS=["Box Biasa","Sincia","Imlek","Natal","Polos"];
const BOX_TYPES=["Box Besar","Box Bites","Box 10x10","Box 11x22"];
const BOX_CATS=["Box Biasa","Natal","Sincia","Imlek"];
const BOX_MAP={"Lapis Bulat":"Box Besar","Lapis Persegi":"Box Besar","Lapis Mix 4 Rasa":"Box Besar","Lapis Mini Bites":"Box Bites","Lapis 10x10":"Box 10x10","Lapis 11x22":"Box 11x22"};
const REFUND_R=["Tidak Terkirim","Kue Rusak","Gagal Dapat Kurir","Ganti Order","Lainnya"];
const REMOVE_R=["Tidak Menjawab","Ongkir Mahal","Stok Kue Kosong","Lainnya"];
const HARI=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const BULAN=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const LP={"Lapis Bulat":{Butter:{Original:395000,_d:445000},Wisman:{Original:550000,_d:600000}},"Lapis Persegi":{Butter:{Original:780000,_d:880000},Wisman:{Original:1190000,_d:1290000}},"Lapis 11x22":{Butter:{Original:410000,_d:460000},Wisman:{Original:615000,_d:665000}},"Lapis 10x10":{Butter:{_d:245000}},"Lapis Mini Bites":{Butter:{_d:295000}},"Lapis Mix 4 Rasa":{Butter:{_d:850000}}};
const KP={"Nastar Wisman":225000,"Kastengel":225000,"Putri Salju":180000,"Sagu Keju":135000,"Semprit Mawar":135000,"Lidah Kucing":120000};
const DEFAULT_SETT={storeName:"KEIK Cakery",storePhone:"+6285940611709",storeAddress:"Ruko Colombus Blok B no.31 - Greenlake City - Cipondoh",sheetsUrl:"https://script.google.com/macros/s/AKfycbyhpKeyoMlypI7NP29tNaDN4s_rMiPd_QD0YVleUPgXBPuYOleT5cKjaxgUXoh1PCld/exec",sheetsUrlStaff:"https://script.google.com/macros/s/AKfycbwkUgskwkXT5DHIV38XfH-2IL-RClKhQT5yc9RBE0EXZ2dbhXKcWgNZvUNyETyVBr-a9g/exec",sheetViewUrl:"https://docs.google.com/spreadsheets/d/1poJWeMiZ7ArZ5b55mI67Xvb85fckWawGfo2sXdwDIAI/edit?gid=0#gid=0",sheetViewUrlStaff:"https://docs.google.com/spreadsheets/d/1p2dCRadEximzhyYm615reZ_2cdPVu5D0vMeChYhg82c/edit?gid=1385248028#gid=1385248028",supaUrl:"https://nymzxmurzkwipnvhlhyn.supabase.co",supaKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bXp4bXVyemt3aXBudmhsaHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjY4OTEsImV4cCI6MjA5MTI0Mjg5MX0.6TKaeuhR55UjIKij0Imodo4lJx8_kc6MTsjLVCyyMgc",logoBase64:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAH0AfQDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAcIBAUGAwIBCf/EAE8QAQABAgMDBQoJBwsEAwEAAAABAgMEBREGByEIEjFBshM2N1FhcXJ0gbEUFSJCc5GhwtEjMjM0NWTBFhclJlJiY4OTouEkU1SUVVaS8P/EABsBAQADAQEBAQAAAAAAAAAAAAAFBgcEAQMC/8QAOhEBAAECAwQIAwcDBAMAAAAAAAECAwQFEQYhcYESMTM0NUGxwRMUckJRYZGh0eEVIjIWUmLxI5Lw/9oADAMBAAIRAxEAPwCmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANpstkWY7SZ7hsnyuzVdxOIrimIiOFMdcz5IHkzpvlqxdLZ3chsTgdkqcpzHLbeMxVdGl7FzH5TnzHGaZ6tJ6Fad827vGbvtoKcNVcnEZfidasJe04zEdNM+WH7qoqpjWXJYx1m/XNFE74cGA/DsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfsRMzpHGQfeGsXsTiLeHw9qu7euVRTRRTGs1TPRELl8n3dnZ2KyKnMcfairO8ZRE3ZmONqmePMjxeVy/Jn3UW8swVnbDP8Prj70c7B2a4/Q0dVUx/an7E8YrEWMNhrmJxN2mzZtUzXXXVOkUxHTOr727f2pQGZ42ap+DbfmMxOHweGuYnFXqLNm1TNVVyudKYiOmZlTjlFbyLG3Gd2cBltEfFmXV1Rauz03ap4TV5mdv/AN7t7a3F15Hkdyuzk9mqaa64nScRMdc/3UNPLtzpbodGXZf8H/yV/wCXoAPilwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0262cojeDks57zfi/4VT3Xn/mx4tfJro5kHkxrGj+j0XsPbwkX6LlFOGpo50V6xzYp06dejoVN5Qu93EbSY2/s5kF+bWTWaubduUTpOJqjp4/2fejXD7b7WWNnbmz9rPsbTltzhVY7prGniiemI8kOdfWu7NUaIzCZbTYuTXVOs+QA+SUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbHZvJsbn+c2MqwFNNV+9Okc6dIiI6ZlK2H3E35w9M38+opvTHGKbOtMT9bk9w/hJwP0dzsrNz0IjMcbcsVxTQuGzeSYbH2qrl7ynTr/BVjeHsFmWx02LmJv2sRhr9U00XKOHGOqYcgnrlMz/QOWR+8z2ZQK7cHeqvWaa6uuUDm+EoweMrs2+qAGw2dy25m+eYPLbUTNWIvU0eaJnjP1OmZ03o6mmap0h3OxG6bM9ocqtZniMdbwOHvRrbiaOdVMePTg3OY7jcZawtd3B53avXKaZmKa7M066dWuqbsvwtrA4Cxg7MRTbs0U0UxHijoaHeZntOz2x+Ox0Vc2/VRNuxETp8urhGnm6VfpzK/dvRTR1TLQruzWBwuCm7e16URrM6+aqF+1XZv3LNzTn26ppq08cTo+H7XVVXVNVUzNUzrMz1y/FhZ4On2K2Hzza2i/dyuizFqzPNrru182NfE5hP3Jo0/kxmM/vX3Yc2MvVWbM109aSyjBUY3F02K50idfRxs7ltrYiPyuX/AOrP4H8yu1n/AHsv/wBWfwWLjyHn0QkZvfnyheZ2OwURr0qvzj9ldf5ldrP+9l/+rP4P2ncntVPTicuj/Mn8FieJx06z+rX/ALv0ef6QwH++fzj9lcsVuX2ss2qq7dzAXtI15tN2YmfrhHOIs3cPiLli9RNF23VNFdM9MTE6TC6VUxTxmY004zKom3ly1e20zi5Yrprt1Yy5NNVPRPyp4pLL8ZXiJqiuOpWtoMnw+XTR8GqZ1162kASStM/Z/KsVnecYbK8HFPd8RXzaZqnSI65mfYlnDbibs2aZxG0FFF3TjFNjWI+1xO5bT+cjK9f7VfZlaWfzpQ+ZYy7h6oij7lu2bybDZhbrrvRrpOnXoq1vF3f5jsdFm9fxNrFYW9XNFFymNJidNeMONWB5S/HZbL/Wvuyr87cFeqvWYrq60LnODt4PGV2bfVH7ADrRbpt3ux+L2xzS7g8NibWHps0RXcrrjXhM6RpCRKtxNcUcNoI5+n/j8Pe4jc5tB8QbbYauudLGL/6e7Pi50xpPsnRaOJ1iKtenoQ+Y4u/h64ijqlcdnMpwOYWavi69KJ+/y8lSNuNlcx2Szb4Bj5priunnWrtH5tcNAsVyhcjnMdk6M0tU63cBXzp9CeE/w+pXV3YPEfHtRXPX5oLOMv8A6fi6rPl1xwH7TE1TERGszwh+PTDfrNr0497qRaV8g3J5ji8HbxOY5raws3KYqiii3zpjXq11hibZbn8xyTKr2ZYLMLeNtWKJruUzRzatI6dOKwGX/qGH+ip9zX7aaTsjmsdXwS57pV6nM703uj5atDu7M4KnBTcjXpRTrrr+Cn4Cws8AAAAAAAAAAAAAAAAAAAAAAAAAAAAd1uK8JOA9C52ZWcnrVj3FeEnAehc7MrOT1q5nPa08Gj7Gd1r+r2hEPKa/YuV+sT2ZQOnflNfsbK/WZ7MoISuW92pVTaPxK5y9IEpcnTJfhu0+Iza5TrbwNv5M/wB+rh7kWrN7i8ljKdhLF65Rzb+Nqm/XrGk6T0R9UR9ZmN74Vifx3GzuE+Zx9ET1U755O90/4QRyk87m7mWDyK3X8mzT3a7ET86eEa/anO9XTas1XK5imiiNZmZ0jTTiqPt3m053tdmOY87nUXL0xb9COEfZCKyix0rk3J8ls2xxnQw9Nimf8p/SGjAWNm4n7k0d7OY+t/dhAKfeTT3sZj6392lwZn3arkndm/EbfP0lLdPTHslXHe5tTtFhNvcwwmEzjGYexZmmmi3auzTTEc2PEsb1x7FWt9EabyM18tdM/wC2EVk9MTdq1+5ats66qcPb0nTf7NX/ACy2r/8AsWZ/+xV+L9jbTayOjaLM/wD2KmgFi6FP3M8+LX/ulvr+2e1d61Vau7Q5jVRVGkxN+eMNFMzM6zOsvwexER1PzVVVV1zqAPX5djuY8I+VelV2ZWmnplVncz4SMq9OrsytNPTKu512lPBomxXYXOMeiKOUv3r5f6392Vf0/wDKX72Mv9b+7KAEllndqVa2n8SucvSABIIB+0VVUVxXTMxVTOsTHVK2u7nOYz7Y7L8wqqiq7Vbii56dPCftVJTXyas6/aGRXbkacL9mmfqn+COzSz8SxM+cLHsvjPl8dFE9Ve79kv5/gKMzyTGYC5EVUX7NVGnslTzH4a5g8dfwl2Ji5ZuTRVE+OJ0XQ6vP1K17/MkpyvbavFWbfNs46iLscOHOjhP8HDk93Sqq3PFO7Z4TWijER5bp9kePTDfrFr0497zemG/WLfpx70+z9czAfqGH+ip9zX7acdkc29Uue5sMB+oYf6Kn3MDbLjslmvqlz3SptHeI4tlu+HVfR7KfALkxoAAAAAAAAAAAAAAAAAAAAAAAAAAAB3O4rwk4D0LnZlZ2etWLcV4Scv8ARudmVnZ61czntaeDR9jO61/V7QiDlNT/AENlUfvE9mUEJ05Tc/0ZlNP+NVP+2UFpTLe7UqptJ4lc5ekNrsjlVed7SYDLKIme73oirh0U9Mz9S3uFsW8LhbWGtRFNu1TFFMadGkIJ5N2SU4nOsZnV2jWMLRFu1rHzqumfq96e+nhr7EZnF7pXItx5LXsdguhYrxEx/lu5Q4bfbnnxLsPiKLdfNv4ue4W9PLHGfqVhSdyh87rx21lvKqZ/JYG30f3quM/Z70YpTLrPwrEa9c71T2hxk4rHVz5U7o5fyAO5CCfeTT3s5j6192lASfeTT3tZj6192HBmfdquSd2b8Rt8/SUtfOj2Kub7PCRmfno7MLR/Oj2Kt76/CRmnnp7MIvJu1q4LTtp3e3x9nGALGzkAAAB2O5jwkZV6dXZlaaemVWtyvhJyr0q+xK0s9Mq5nXaU8GibFdhc4+yJ+Ux3s5d63PZlACfuUx3s5d63PZlAKTyzu1KtbT+J3OXpAAkEAN/u+zici2vy/MedpbpuxTd8tFXCWgHlURVGkv3brm3VFdPXG9dS1XTdt03KJ1prpiYnySj3f7kcZrsbXj7dGuIwFXdI0jX5Pzve2W5rO/jzYXCV3Kudfw35C75410+uOLq8ywlvH5fiMFejWi9bmirzTCo29cLid/lLW7sU5tlu77VP6/8AamD0w/6e36Ue9kZ3ga8tzfF4C5GlVi7Vbn2SxrP6aj0o963xOrIpiYnSVzcu45dhvoqfcwdsO9PNfVLnulmZZOuWYWf8Gj3MLbHvSzX1O57pU2jvHNst7w6r6fZT4BcmMgAAAAAAAAAAAAAAAAAAAAAAAAAAAO43GeErLvRudmVnp61YdxnhJy7zXOzKz09auZz2tPBo+xnda/q9oQ1ynJ/6TKI/xK/cg5N/Kc/V8n9Ov3Ip2Jyi5nu1OAyyiJmLt2OfPipjjM/UlMumIwtMyquf0VXM0uUx1zMR+kLF7mMnjJ9gsFTXRzL2Jib9zx61dGvsdVmmMtZdl2Ix1+rS3YtzcqnyRD2sW6bVq3aoj5FEREeTRHPKEzr4v2OjL7dURdx9fM6ePNjjP4ICmKsTio185aDfmnKss0j7NP6/9q/5/mFzNc6xmZXZ+ViL1VfmiZ4R9TBBbojRkUzMzrIAPBPnJp728y9a+7CA0+cmnvazH1r7sODM+7Vck7s34jb5+kpb+dHsVZ30TrvIzX06ezC03zo9irG+XwkZt9JHZhGZN2tXBaNtO72+Ps48BYmdAAAAOz3KeEnK/PX2JWknplVzcn4Scr89fYlaOemVczrtKeDRNiuwucfZE/KY72cu9bnsygBP/KX72cv9b+7KAEnlndqVa2n8TucvSABIIAABK3JyzuMHtFicnu3ObbxlHOtx/fp8Xl09ywMebyKdbMZjVlO0GBzGmZjuF+mudJ6teP2LgYS/RicLaxFudablEVR7Y1V3OLPRuU3I82jbG4vp2KrEz/jOvKVeeUJkU5ftZRmlqjSzj6NZ0/tx0o2tfpaPShZjflkc5xsPfu2qedfwVXdqNI4zEdP2KzW/0lPnhKZde+LYiZ643KrtDgvlMdVEdVW+Of8AK5eUTrlOEn/Ao9zC2znTZDNp/c7nulmZLOuT4Kf8Cj3MPbXvPzf1O57pVunvHNpN3w6r6PZT8BcmNAAAAAAAAAAAAAAAAAAAAAAAAAAAAO43GeEnL/RudmVnp61Y9xXhJwHoXOzKznWrmc9rTwaPsZ3Wv6vaEM8pyP8Apcnn+/X7mHybMjmvG43PrtHyLdPcLMz11TxnT2M3lOUzOFybTWZ7pXER7EgbsMmpyLYnL8Hzebdqt91u8OmqrjPvfSb3w8vpjznc5rOD+Z2hrqmN1Gk89I0dNETorjyg85jMdsowFqZ7lgbfM01+dPGf4LAZ5j7WV5Pi8wv1c23YtTXM9fCFQc3xt3Ms0xWPvTrcxF2q5Ptl5k9nWqq5Pk+m2WM6NqjDRO+Z1nl1MQBYGegACfeTT3tZj6192EBJ95NPezmPrX3YcGZ92q5J3ZvxG3z9JS11wqvvj8I+bfSR2YWo69fIqzvniqN5Ga86NPl06eWObCMybtauC0bad3t8fZxwCxM6AAAAdpuS8JOV+evsStHPTKrm5LwlZX/mdiVo56ZVzOe0p4NF2L7C5x9kT8pfvZy/1v7soAT9ymO9nLvW57MoBSeWd2pVnafxO5y9IAEggAABZ/cnnfxzsPhormZvYT8hX7I4T9WisCVOTpnlWC2lvZNcq/I423rTE9Vcf8e5w5jZ+LYn8N6e2bxnyuPp16qt08+r9VgMRZoxOHuWLlOtFymaKo06tNFQtqsquZNtRjMsuUzT3G/MU+jrw+xcHojh54lAnKNyaMNn2Azm1TpTio7lXOnzqeMfZKLye70bk0T5rTthg+nh6b8ddM6cpThk9M0ZThKJ6abFEfYwtte8/N/U7nulnZVr8VYTWePcKPcwdtO9DN/U7vZlH0945p674dV9Hsp+AuTGgAAAAAAAAAAAAAAAAAAAAAAAAAAAHdbifCRgfQudlZzplWPcT4SMD6FzsrO9auZz2tPBpGxfda/q9ocbvF2UubTZhktU83uGExHPuxPi6o9ujsKKeZTFERERTTpEQ+ukRld6quimifJZsPgrdi9cvR119aLuUVnFeC2TsZbbqmmvHXfl6f2KePvV5WC5SOVXcVs3hMytRzowd2efpHRTVw19yvqzZXFPy0dFmW1E3JzGvp/hpw0AEgrwAAn3k097OY+t/dpQEn3k097WZetfdhwZn3arkndm/EbfP0lLX8Y0azMdnsizHEzicdlWExF6emu5biZ0bOImZjTyOE2r3o7PbPZxdyvE28Vev2tOf3KiJiJmNdNZlW8PbvV1aWutpmYYjB2aInF6dH8d+9v6dktmKfzcjwEf5UPWnZnZ2mNIyXA+yzS4X+e3ZfXjgsx//FP4vSnfZsrPThswj/Lj8XV8tjfx/NE/1LI/+P5fwyd7uy+RxsFmOJw+WYXD38PRFyi5btxTMaT5ParYmfeTvWyfO9lcTlGVWMV3TE6U1VXKYpimNePWhhN5fRdotaXetSNoL2EvYqKsLp0dI6vvAHcg3abkvCVlfnr7ErRz0yq5uT8JOV+evsStHPTKuZ12lPBouxfYXOPsiblMd7WXetT2ZQCn7lMd7eW+tT2ZQCk8s7tSrO03iVzl6QAJBAAADY7M5ldyjP8ABZlaqmmqxepqnSerXjH1atczMlwN7M82wuX2KZquYi7TRTHnl5VppvfqiaoqiaetcfCX6cRhLN+mdablEVx7XPbxNlre1eRRgomim/br7pZqqnTSY6m+y6x8GwGHw8afkrcUfVD3np4KZTd+Fd6VDarmGjF4X4V77Ub3xhrXwfDW7E1RVFumKNfHpGjV7a8NkM39Tu9mW387Tbcz/U3OPU7vZktT0r1Mz97zGURRg7lMdUUz6KggLoxQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3W4nwkYH0LnZWd65Vi3E+EjA+hc7MrOT1q5nHbU8Gj7Gd1r+r2h+hD4t3rFd2u1buU1V0T8qmKomYnzdSI0lcKq6Y3S1+1eWW842cx2XXY1i/Zqp6OvTWFQMXZrw2Ku4e5GldquaKo8sToulrOnSq1vkyf4n26xlNFMxaxGl+jXy9P2+9OZNd/yt81F2zwm6jERH4T6x7uNATyhAACfeTTH9Wcxn96+7CAk/cmnvWzH1v7sODM+7Vck7s34jb5+kpZidJ+pVXe/4Rs3+ljswtV876lVt8Mabx83+ljswjMm7SrgtG2nd7fH2ciAsTOgAAAHZ7lfCTlXpV9iVpJ6ZVb3KeEnK/PX2JWknplXM67Sng0TYrsLnH2RNymO9rLvW57MoBT/ymO9nLvW57MoASeWd2pVrafxO5y9IAEggAABJvJ3yeMdthczG5TrbwFrnR6VXCPs1RksZyesm+AbG15hXTzbuOuTVr/djhH4uPH3fh2Kp+/cmdn8L8zj7dM9Ub/y/lJZHEiNZfFm9ZvxVNq7RXFMzTVpVExE+KdOuFR6O5r3TpiYpl9tLt13m5x6nc90t118Wl267zc49Tue59cP2tLmzDut36Z9FQgF1YiAAAAAAAAAAAAAAAAAAAAAAAAAAAA7rcV4SMB6Fzsys7PFWLcT4SMD6FzsrOzPFXM47ang0fYzutf1e0PLGX6MNhLuIuTFNFqiapmeiOGv4K97vtuL1vehfxeKv1RhMyvVUVRM6xTEz8lKO+7OfijYTFU0Vc29jPyFGnTxjj9mqsVquq3cpuUTpVTMVRPlh98rw0VWapq+04Nqszqoxtqi3PZ7+a6usaa9PtRDykckm/k+Dzu1RrVh6+ZcmI+bV/wA6JC2EzejPNlMvzKmdarlqIueSqOE/xZG1uVW862bx2W3KYmL1mqI16p04fwRuHrqw2IjpeUrLmNqnMssqmjfMx0oU8HtjcPdwmMvYW9TNNy1XNFUeWJ0eK3MiAAE/8mrvWzH1v7tKAE/8mrvVzH1v7tLgzPu1XJO7NeI2+fpKWPnR7FWN8sabyM28tymf9sLT/Oj2Kt76o03kZp6VPZhGZN2tXBaNtO72+Ps4wBYmdAAAAO03J+EnK/PX2JWjnplVvcp4Scr89fYlaSemVczrtKeDRNiuwucfZE/KX72cv9b+7KAFgOUv3sZf6392Vf0nlndqVa2n8TucvSABIIAABk5Vg7mYZlhsFajWu/dptx7ZXDybBW8uyjC4GzTFNFi1TREeaFetwGRVZntj8YV0/kMBRz9dPnzwiPesh9qv5ze1qptxPU0LY3B9G3XiJjr3Ry63O7xc+o2c2TxmYc6IuxTzLPlrnoRvyc9oL2JxeZZRi7s3Krk/CaJqnWddflMXlJ55N3HYLILc/JtR3a75ZnoR/u2zmci2zy7HTVzbfdYt3fLTVwl98NhNcHMTG+r/AOhw5pnM05xTVTP9tudP3W0abbnjsbm/qdz3S3FNVNdumuJ1iqNY18TU7axrsjm0fudzsyg8PGl2mPxXnHVRVhLkx50z6KfgLqxIAAAAAAAAAAAAAAAAAAAAAAAAAAAB3e4jwk4H0LnZlZuetWPcR4ScD6Fzsys5PWrmc9rTwaRsZ3Wv6vaEO8puqr4tymnq7tVrp5kFp25Tcf0VlVX+PVH+2UEpXLe7UqntH4lc5ekJ15NWcd0wGPyW5X8q1VF63GvHmz0/b70xcNdJ6FUN1udzkO22AxlVU02aq+5XePCaauHH26LXRMTTE0zrExqh82s9C70481w2SxsXsJNmeuj0lWbfpks5Vtzev0URTZxtMXqdOjXoq/8A7yuCWP5QGRU5lsfOY26Nb+BqiuJiNZ5k8JhXBNYC98WxE+cblLz3BfJ46uiOqd8cJAHYhxP/ACau9bMPW/u0oAT7yaZ/qxmMfvX3aXBmfdquSd2b8Rt8/SUtfOj2Ktb6Z13kZr6VPZhaX50exVjfL4SM2+kp7MIzJu1q4LRtp3e3x9nHgLEzoAAAB2e5Xwk5X6VfYlaSemVWty3hIyr0q+xK0s9Mq5nXaU8GibFdhc4+yKOUv3rYD1v7sq/rAcpfvWy/1v7sq/pPLO7Uq1tP4lc5ekACQQADa7I5XVnW0mAyymJmL96mmrTqp14/Y8mdI1l+qaZqmKY65WA3DZJOVbEW8Vco0v46ubs8OPN6Kfs4pBqmmmmZqnSKY1mfFDywOGtYPCWcLapimizRFFMRw0iOpyu+HO5yPYbG3bdc04i/EWLU69dXTP1KjXM4rEcZa/aijKsujX7FO/irxvEzec72yzLMInWiq7NFv0aeEe5obUzF2iY6Yqh8zxnWX1b/AElPnhbaaYpiKY8mQ3Lk3K5rq653rlZPM1ZRg5mdZmzR7mLtf3p5t6nd7MsrJ/2Rg/oKPcxdsO9PNvU7vZlT6O35tju+HT9Hsp6AuTGQAAAAAAAAAAAAAAAAAAAAAAAAAAAHdbifCTgfQudmVnJ61Y9xPhIwPoXOys5PWrmc9rTwaPsZ3Wv6vaEQ8pmP6Eyuf3iezKB09cpn9g5Z6zPZlAqUyzu1KqbR+JXOXpD9pmaaomJ0mOMStfuuzr4+2JwGMqriq9TR3K7x6KqeHH6tVT0z8mnOOZiMxyW5cn5dMXrVPVr0VfwfjNLMXLEz92999lsX8vj6aJ6q937JozPCWsdluIwV+mKrd+3NuqJjhxhT7P8ALruU51jMuvUzFeHu1UcfFE8J+pcmOnyK9covJKsHtPZze3bmLONt82qr+/T/AMODJ72lc2581g2ywfStU4inrpnSeE9SLQFhZ4J85NPe3mXrX3YQGnzk097eZetfdhwZn3arkndm/EbfP0lLXXHsVX3xTrvHzf6WOzC1PRpKrG+WiqjeRm0VRMa3KZjyxzYRmTdrVwWnbXu9vj7OPAWJnIAAADsdzPhIyr06uzK009Mqs7mfCRlPp1dmVpp6ZV3Ou0p4NE2K7C5xj0RRyl+9fL/W/uyr+sByl+9bL/W/uyr+kss7tSrW0/iVzl6QAJBACX+Tbkfd80xmeXrUTRYp7jZqmOiueMzHs0+tEMRMzpEazK1e6jI6sh2HwWDvURTfuR3a76VXHTz/AIODMr3w7ExHXO5P7NYP5nH0zMbqd8ur6vF1oC5R+d/Cc9wuS2q9beFo7pciJ+fV4/Z70743EW8LhL2Ku1RTbtUTXMz4ojiqDtTmdecbQ47MrlU1d3vVVRrPVrw+xGZRZ6Vybk+S0bY4z4eHow8fanXlDWPq1+kp88Pl92f0tHpQsTOFysp/ZWE+go9zD2y70c29TudmWblX7Lwv0NHuYW2fejm3qdz3SptHeObZbvh1X0eynwC5MaAAAAAAAAAAAAAAAAAAAAAAAAAAAAd1uK8JOA9C52ZWd8aomwuffyb2nwmbzam7TZmedRE6TMTGkpso317Lzb51WFx1NWnGnmR+KEzTC3btymq3Gq77L5phcJZrov19Gddf0YHKZn+gcsj95nsygZIO9zb7D7YxhMPgsJcsYfD1TXrcmNapmNOiEfJDBWqrVimmqN6uZ1ibeKxtd21OtM/sOh3dZ1OQbY4DMJnS3Tc5lz0auEueImYnWOEumqmKomJR1u5VbriunrjeurRXFdFNdH5kxExPkcfvlySM62ExlNNHOv4anu9qY6pp6Y9scHMbAb2cip2ew2Dz7E3cPi7FEUTV3Oaqa4jr4N7jt6mxHwK7T8ZVXudRMcymzVx19isW8LiLN6JinqlqGIzXAY7AVU13Iiao+/frorIPfMK7NzH4i5h6Zps1XaptxPTFMzw+x4LSywT3yaJ/q7mfrMdmECJD3SbwMNsfZxeFxuDu37OIriuKremtM6adbkx1uq7YqppjWUrkmJt4XG0Xbs6Uxr6LKdceLxNdjshyXHYr4VjcrwmIvaRE13LUVSjmd+OQc7hlWO08fyfxJ34ZDrwyvH/XT+Kv04HF076YmObQr2fZTejo3KomOE/s7+dmNnJnX4jy/wD0KX3Gzez8dGS5fH+RT+CPP58ci/8Aisd9dL9o34ZDP52V46nzTS+nymN/H83w/quR/wDH/wBf4SHXs5kFVNVM5LgNJjj+Qp4wqxt9gLGWbZ5tgcNRFuzaxNUW6Y6KaemI+1Mle/DIe5VTRluOm5p8mJ5umv1oO2izK5nGeY3NLtPNrxV6q5NPi1noSOW2b9uaviqztHisvvxR8pp566RowAEsqrrtzs6bx8o+kq7MrU1dM+dUTYTN7ORbWZfmuJpqqs2LmtcUxrOkxMfxWFo3qbEV0RXOb82Zj82bVWsfYgs2w927XE0U67l52Sx+Gw1q5Terimddd7nuUvP9Vsu9b+7Kv6Vd9+3WTbTYPCZdk9Vy9TZuzcruzRzY6NNIRUkcBbqt2Kaao0lXs+xFvE4+5ctTrE6egA7EO6rdXkNW0O2uCwk062LVXd78zHDm0z0e2dI9q1lERTTFNMaUxHCPFCuO4vaXItm80x93Ob04eq/apot3ebMxEROsxw9iXLm9HYiiOd8c01R4qbdX4ILNLd67XEU06xC97K4jB4WxXXduRFUz5z5Qxt+edfFOw2Is0VaXsbV3CnTxdc/UrI73fHtpY2szaxRl83PgOGiYo58aTVVPTLgkhl9ibFmIq61ez/HxjsbVXROtMbo4D6tfpaPSh8v2iebVFUdU6u1Crm5V+zMJ9DR7mFtn3pZtM/8Ah3ezKO8g305DGAsWcxweLsXaKIpqmmmKqZ008rF2z3w5JjcgxuX5ZhMTcu4mzVaiuunm0xrGmqsUYG/F/Wad2rTrmfYCrATTFz+7o6aefUgwBZ2YgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADa7KZDjtpM7s5VgKY7pc4111fm26I6ap8kQ1Tvt0t+5awG1FGDnTMLmWTFjTpmNflRHs0H5qnSNTGW92+R42rL71jM89rtzzb2ItXotURPXzY62s2syTIactozrZfMrmIwU1RRew2IjS9h6p6In+1HlcrOus6669epFVURMRMxE9Ma9IRGnm/AZuMyrMsHgcNjsVgcRZw2KiZsXa6Jim5p4pH6YQAAAAAA+rdFdyuKLdNVdUzpEUxrMszHZPmuAsUX8bl+Jw9qv82q5bmmAYlm1dv3abVm3XcuVTpTTRTrM+aG/2Fsxb2ywOFxuHqiLtdVmqi5TpxqpmmOE+WYaLC4i/hcRRiMNdrtXaJ1prpnSYdVlm3WKjNcBjM8wOGzX4Hcprprqp5l3hOv50D81a6bnLY/D14TG38LcjSuzcqt1R5YnR4uv3h4bCZljL21uT1ROX5hfmquzP5+GuTxmiqPFr0S5AexOsAA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGTlmPxeW461jcFeqs37U601R7p8cMYBnZzjbWYYycXRhLeGrrjW5Tbn5M1dcxHUwRkZdVhacfYqx1FyvCxcibtNuflTTrxiAdpu82JqzHKcbtZnNu5byLLqedVw44ivWIiiPJrOky6DfDtxidr93mzsV5XYwGHsYi5RZpt0zETTTGkfY0Gb7z88qxPwfJa/gGS2qItWcv5sTbmiP7Udcs/e5tFh872M2Npw2X4bAaYe9Xds4eNKOfz9JnTy6a+0fCYmaomqP4Rm2VjJcbe2fxGeURR8Dw96mzXMzxmqejSPa1qbN2GxtW1O6C7hvhFvD2qs2i7dqrq0maKadNKfHOumkD6V1xRGsohw+UZlfyy9mdrCXJwdmdK706RTE+Lj0+xgup28z29i8VOSYWxOByvAVzbs4WOHGOE1VeOqXLD9RvdXg9g83u5Xhc1xmJy7LsFiqefZu4nERTzqfHERrLns1wtvBY+5hrWMs4yiidIvWZnm1ebVJeLyHEbS7qtmcf8aYHB2sLXew1dWLvcyOE8Ijx8IRznmAs5bj5wtjMcNj6YiJm7YmZp18XEfmmdXW7pMZTRVmmAwti1Gb4jDzOBv1URVNNVMTrTGvjh8bPYnaTNMBn1rMfh2NwlGDuVXe6xNfMuR0aeKdfE5TIczxOTZzhM0wk6XsNdi5T4p06p8k9Du9vdtc/t7RWs5yjHV4LA46zTetWbWkW54fLpqp6J4666jyqJ13I2Gx2gxmDx+O+GYTDfBZu0869ap/NivrmnyS1w+j7puXKbdVum5VFFenOpieE6dGsPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHpcvXblu3buXKqqLVPNoiZ4UxrrpHtl5gDuM3zy3g9gNmcBleYaYmzduYi/Tbr40V87WnXyuHB5Mauv3gW8LmOFy/anB1W9cfTzMZbp4cy/THHh5elyD95083m6zzdddNeD8CI0STsplv8AKndbcya1meCwuJwGZd3iMVe5kdzqo0nT2uS2myGxksW6aM8y7ML1U6V0YWua+Z556GjB5FOg9Ll+9cs27Ndyqq3a17nTM8KdZ1nR5g/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="};
const B="#E8604A", BL="#FFF5F3";

// ── SUPABASE HELPER ──────────────────────────────────────
const SB={
  url:"",key:"",
  init(url,key){this.url=url;this.key=key;},
  hd(){return{"apikey":this.key,"Authorization":"Bearer "+this.key,"Content-Type":"application/json"};},
  ok(){return !!(this.url && this.key);},
  async get(t,q=""){try{const r=await fetch(this.url+"/rest/v1/"+t+"?"+q,{headers:this.hd()});const j=r.ok?await r.json():[];return j;}catch(e){return [];}},
  async ins(t,d){try{const r=await fetch(this.url+"/rest/v1/"+t,{method:"POST",headers:this.hd(),body:JSON.stringify(d)});if(!r.ok){const txt=await r.text();alert("Gagal simpan ke Supabase: "+txt);}return r.ok;}catch(e){alert("Supabase error: "+e.message);return false;}},
  async upd(t,id,d){try{const r=await fetch(this.url+"/rest/v1/"+t+"?id=eq."+id,{method:"PATCH",headers:this.hd(),body:JSON.stringify(d)});if(!r.ok){const txt=await r.text();alert("Gagal update Supabase: "+txt);}return r.ok;}catch(e){alert("Supabase error: "+e.message);return false;}},
  async updBox(bt,bc,d){try{const r=await fetch(this.url+"/rest/v1/box_inventory?box_type=eq."+encodeURIComponent(bt)+"&box_cat=eq."+encodeURIComponent(bc),{method:"PATCH",headers:this.hd(),body:JSON.stringify(d)});return r.ok;}catch(e){return false;}},
  async del(t,id){try{const r=await fetch(this.url+"/rest/v1/"+t+"?id=eq."+id,{method:"DELETE",headers:this.hd()});return r.ok;}catch(e){return false;}},
};

// ── HELPERS ──────────────────────────────────────────────
const rp=n=>"Rp "+Number(n||0).toLocaleString("id-ID");
const fmtTs=(d=new Date())=>HARI[d.getDay()]+", "+d.getDate()+":"+BULAN[d.getMonth()]+":"+d.getFullYear();
const toISO=s=>{const p=(s||"").split("-");return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:""};
const fromISO=s=>{const p=(s||"").split("-");return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:""};
const parseDate=s=>{if(!s)return null;const[d,m,y]=s.split("-");const r=new Date(y,m-1,d);return isNaN(r)?null:r;};
const autoPrice=(kat,prod,ment,rasa)=>{if(kat==="kering")return KP[prod]||0;if(kat==="lapis"&&LP[prod]){const m=LP[prod][ment];if(!m)return 0;return m[rasa]??m._d??0;}return 0;};
const itemLabel=it=>it.kat==="lapis"?`${it.produk} ${it.mentega} - ${it.rasa}`:it.kat==="lainnya"?(it.keterangan||"Lainnya"):it.produk;
const mkItem=()=>({id:Date.now()+Math.random(),kat:"lapis",produk:"",mentega:"Butter",rasa:"Original",qty:1,harga:0,keterangan:""});
const emptyForm=()=>({nama:"",alamat:"",noHp:"",tanggalKirim:"",pengiriman:"Pickup",jenisBox:"",keterangan:"",status:"NOT PAID"});
const emptyOng=()=>({show:false,type:"Pickup",berat:0,harga:0,kendaraan:"Bike"});
const emptyDisc=()=>({show:false,amount:0});
let _ic=1;
const mkInvNum=()=>{const d=new Date();return `INV-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${String(_ic++).padStart(3,"0")}`;};
function updItem(it,f,v){
  const u={...it,[f]:v};
  if(f==="kat"){u.produk="";u.mentega="Butter";u.rasa="Original";u.keterangan="";u.harga=0;}
  if(f==="produk"&&u.kat==="lapis"){const p=LAPIS.find(x=>x.name===v);if(p&&!p.mentega.includes(u.mentega))u.mentega=p.mentega[0];}
  if(["produk","mentega","rasa","kat"].includes(f))u.harga=autoPrice(u.kat,u.produk,u.mentega,u.rasa);
  return u;
}

// ── CSS INJECTION ──
const CSS=`
*{box-sizing:border-box} body{margin:0}
.app{font-family:system-ui,sans-serif;max-width:920px;margin:0 auto;padding:16px;background:#f8fafc;min-height:100vh}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:12px}
.inp{width:100%;padding:7px 10px;border-radius:7px;border:1px solid #cbd5e1;font-size:13px;background:#fff}
.lbl{font-size:12px;color:#64748b;display:block;margin-bottom:3px}
.btn{padding:8px 18px;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px}
.modal{background:#fff;border-radius:16px;padding:24px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.badge{padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{padding:9px 10px;text-align:left}
thead tr{background:#f1f5f9}
th{border-bottom:2px solid #e2e8f0;color:#475569;font-weight:700}
`;

// ── GENERIC COMPONENTS ───────────────────────────────────
function Modal({title,onClose,mw=500,children}){
  return(
    <div className="overlay">
      <div className="modal" style={{maxWidth:mw}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{margin:0,fontSize:16,fontWeight:700}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#94a3b8"}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ReasonModal({title,subtitle,options,onClose,onConfirm,confirmColor="#dc2626",confirmLabel="Konfirmasi"}){
  const[reason,setReason]=useState("");
  const[other,setOther]=useState("");
  const valid=reason&&(reason!=="Lainnya"||other.trim());
  return(
    <Modal title={title} onClose={onClose} mw={420}>
      {subtitle&&<p style={{fontSize:13,color:"#64748b",marginBottom:16}}>{subtitle}</p>}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {options.map(r=>(
          <label key={r} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,border:`2px solid ${reason===r?confirmColor:"#e2e8f0"}`,cursor:"pointer",background:reason===r?BL:"#fff"}}>
            <input type="radio" value={r} checked={reason===r} onChange={()=>setReason(r)} style={{accentColor:confirmColor}}/>
            <span style={{fontSize:14,fontWeight:reason===r?700:400}}>{r}</span>
          </label>
        ))}
      </div>
      {reason==="Lainnya"&&<div style={{marginBottom:16}}><label className="lbl">Alasan lainnya *</label><textarea value={other} onChange={e=>setOther(e.target.value)} rows={3} className="inp" style={{resize:"vertical"}} placeholder="Masukkan alasan..."/></div>}
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <button className="btn" style={{background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0"}} onClick={onClose}>Batal</button>
        <button className="btn" style={{background:valid?confirmColor:"#94a3b8",color:"#fff"}} disabled={!valid} onClick={()=>onConfirm(reason==="Lainnya"?other.trim():reason)}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

function Badge({status}){
  const m={"PAID":{bg:"#d1fae5",c:"#059669"},"NOT PAID":{bg:"#fee2e2",c:"#dc2626"},"SEND":{bg:"#d1fae5",c:"#059669"},"REFUND":{bg:"#fee2e2",c:"#dc2626"}};
  const cfg=m[status]||{bg:"#dbeafe",c:"#1d4ed8"};
  return(<span className="badge" style={{background:cfg.bg,color:cfg.c}}>{status}</span>);
}

function DateField({value,onChange,placeholder}){
  return(
    <div style={{display:"flex",gap:4}}>
      <input type="text" placeholder={placeholder||"DD-MM-YYYY"} value={value} onChange={e=>onChange(e.target.value)} className="inp" style={{flex:1}}/>
      <input type="date" value={toISO(value)} onChange={e=>onChange(fromISO(e.target.value))} style={{padding:"7px 4px",borderRadius:7,border:"1px solid #cbd5e1",fontSize:12,background:"#fff",cursor:"pointer",width:36}}/>
    </div>
  );
}

function KeikLogo(){
  return(
    <svg viewBox="0 0 295 308" width="160" height="165" xmlns="http://www.w3.org/2000/svg">
      <line x1="164" y1="50" x2="179" y2="30" stroke="#7dd3c8" strokeWidth="8" strokeLinecap="round"/>
      {["K","E","I"].map((l,i)=><text key={l} x={8+i*74} y="192" fontSize="120" fontWeight="600" fill={B} fontFamily="Century Gothic,Arial,sans-serif">{l}</text>)}
      <g transform="translate(290,0) scale(-1,1)"><text x="8" y="192" fontSize="120" fontWeight="600" fill={B} fontFamily="Century Gothic,Arial,sans-serif">K</text></g>
      <defs><path id="arc" d="M 35 252 Q 147 292 258 252"/></defs>
      <text fontSize="16" fill="#7dd3c8" fontFamily="Century Gothic,Arial,sans-serif" letterSpacing="5"><textPath href="#arc" startOffset="50%" textAnchor="middle">CAKERY</textPath></text>
    </svg>
  );
}

function ItemRow({item,onUpdate,onRemove}){
  const si={width:"100%",padding:"7px 10px",borderRadius:7,border:"1px solid #cbd5e1",fontSize:12,background:"#fff"};
  const isL=item.kat==="lapis", isX=item.kat==="lainnya";
  const mopts=(LAPIS.find(p=>p.name===item.produk)||{mentega:["Butter"]}).mentega;
  const ap=autoPrice(item.kat,item.produk,item.mentega,item.rasa);
  const F=({label,children})=><div><label style={{fontSize:11,color:"#94a3b8",display:"block",marginBottom:2}}>{label}</label>{children}</div>;
  const XBtn=()=><button onClick={onRemove} style={{padding:"6px 8px",background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,alignSelf:"flex-end"}}>✕</button>;
  const KatSel=()=><F label="Kategori"><select value={item.kat} onChange={e=>onUpdate("kat",e.target.value)} style={si}><option value="lapis">Kue Lapis</option><option value="kering">Kue Kering</option><option value="lainnya">Lainnya</option></select></F>;
  return(
    <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:10,marginBottom:8}}>
      {isX?(
        <div style={{display:"grid",gridTemplateColumns:"110px 1fr 80px 100px 36px",gap:6,alignItems:"end"}}>
          <KatSel/><F label="Keterangan"><input value={item.keterangan||""} onChange={e=>onUpdate("keterangan",e.target.value)} placeholder="Nama / deskripsi..." style={si}/></F>
          <F label="Qty"><input type="number" min="1" value={item.qty} onChange={e=>onUpdate("qty",e.target.value)} style={si}/></F>
          <F label="Harga (Rp)"><input type="number" min="0" value={item.harga} onChange={e=>onUpdate("harga",e.target.value)} style={si}/></F>
          <XBtn/>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"110px 1fr 90px 90px 70px 100px 36px",gap:6,alignItems:"end"}}>
          <KatSel/>
          <F label="Produk"><select value={item.produk} onChange={e=>onUpdate("produk",e.target.value)} style={si}><option value="">-- Pilih --</option>{(isL?LAPIS.map(p=>p.name):KERING).map(p=><option key={p}>{p}</option>)}</select></F>
          <F label="Mentega"><select value={item.mentega} onChange={e=>onUpdate("mentega",e.target.value)} style={si} disabled={!isL}>{(isL?mopts:["-"]).map(m=><option key={m}>{m}</option>)}</select></F>
          <F label="Rasa"><select value={item.rasa} onChange={e=>onUpdate("rasa",e.target.value)} style={si} disabled={!isL}>{(isL?RASA:["-"]).map(r=><option key={r}>{r}</option>)}</select></F>
          <F label="Qty"><input type="number" min="1" value={item.qty} onChange={e=>onUpdate("qty",e.target.value)} style={si}/></F>
          <F label={<>Harga{ap>0&&<span style={{color:B,marginLeft:3,fontSize:10}}>auto</span>}</>}><input type="number" min="0" value={item.harga} onChange={e=>onUpdate("harga",e.target.value)} style={{...si,borderColor:ap>0&&item.harga===ap?B:"#cbd5e1"}}/></F>
          <XBtn/>
        </div>
      )}
      <div style={{textAlign:"right",fontSize:11,color:"#64748b",marginTop:4}}>Subtotal: {rp(item.harga*item.qty)}</div>
    </div>
  );
}

function RekapiSection({orders}){
  const[dari,setDari]=useState("");
  const[sampai,setSampai]=useState("");

  // filter orders berdasarkan range tanggal
  const filtered=orders.filter(o=>{
    if(!dari&&!sampai) return true;
    const d=parseDate(o.tanggalKirim);
    if(!d) return false;
    if(dari){const dr=parseDate(dari); if(dr&&d<dr) return false;}
    if(sampai){const sp=parseDate(sampai); if(sp&&d>sp) return false;}
    return true;
  });

  // grouping by date
  const byDate={};
  filtered.forEach(o=>{
    const d=o.tanggalKirim||"Tanpa Tanggal";
    if(!byDate[d])byDate[d]={lapis:{},kering:{},lainnya:{}};
    (o.items||[]).forEach(it=>{
      if(it.kat==="lapis"){const k=`${it.produk}||${it.mentega||"Butter"}||${it.rasa||"Original"}`;byDate[d].lapis[k]=(byDate[d].lapis[k]||0)+Number(it.qty||0);}
      else if(it.kat==="kering"){byDate[d].kering[it.produk]=(byDate[d].kering[it.produk]||0)+Number(it.qty||0);}
      else{const nm=it.keterangan||"Lainnya";byDate[d].lainnya[nm]=(byDate[d].lainnya[nm]||0)+Number(it.qty||0);}
    });
  });
  const sd=Object.keys(byDate).sort((a,b)=>(parseDate(a)||new Date(0))-(parseDate(b)||new Date(0)));

  // download rekap as CSV
  const downloadCSV=()=>{
    const rows=[["Tanggal","Kategori","Produk","Qty"]];
    sd.forEach(d=>{
      Object.entries(byDate[d].lapis).forEach(([k,q])=>{const p=k.split("||");rows.push([d,"Kue Lapis",`${p[0]} ${p[1]} — ${p[2]}`,q]);});
      Object.entries(byDate[d].kering).forEach(([n,q])=>rows.push([d,"Kue Kering",n,q]));
      Object.entries(byDate[d].lainnya).forEach(([n,q])=>rows.push([d,"Lainnya",n,q]));
    });
    const csv=rows.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n");
    const label=dari&&sampai?`${dari}_sd_${sampai}`:dari?`dari_${dari}`:sampai?`sd_${sampai}`:"semua";
    const a=document.createElement("a");
    a.href="data:text/csv;charset=utf-8,"+encodeURIComponent("\ufeff"+csv);
    a.download=`rekap_pesanan_${label}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const SL=({label,c,bg})=><div style={{padding:"4px 14px",fontSize:11,fontWeight:700,color:c,background:bg,textTransform:"uppercase",letterSpacing:1}}>{label}</div>;
  const IL=({nm,qty})=><div style={{display:"flex",justifyContent:"space-between",padding:"5px 14px",borderBottom:"1px solid #f1f5f9"}}><span style={{fontSize:13}}>{nm}</span><span style={{fontWeight:700,fontSize:13,border:`1px solid ${B}`,color:B,borderRadius:20,padding:"2px 12px"}}>{qty} pcs</span></div>;

  return(
    <div style={{marginTop:16,borderTop:"2px solid #e2e8f0",paddingTop:16}}>
      <h4 style={{margin:"0 0 12px",fontSize:14,fontWeight:700}}>📊 Rekap Pesanan Kue</h4>

      {/* FILTER TANGGAL */}
      <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:12,marginBottom:14}}>
        <div style={{display:"flex",gap:10,alignItems:"end",flexWrap:"wrap"}}>
          <div style={{minWidth:160}}>
            <label className="lbl">📅 Dari Tanggal</label>
            <DateField value={dari} onChange={setDari} placeholder="DD-MM-YYYY"/>
          </div>
          <div style={{minWidth:160}}>
            <label className="lbl">📅 Sampai Tanggal</label>
            <DateField value={sampai} onChange={setSampai} placeholder="DD-MM-YYYY"/>
          </div>
          {(dari||sampai)&&<button className="btn" style={{background:"#fee2e2",color:"#dc2626",border:"1px solid #fecaca",fontSize:12,padding:"7px 12px"}} onClick={()=>{setDari("");setSampai("");}}>✕ Reset</button>}
          {sd.length>0&&<button className="btn" style={{background:"#059669",color:"#fff",fontSize:12,padding:"7px 14px",marginLeft:"auto"}} onClick={downloadCSV}>⬇️ Download CSV</button>}
        </div>
        {(dari||sampai)&&<div style={{fontSize:12,color:"#1d4ed8",marginTop:8,fontWeight:600}}>Menampilkan {filtered.length} order{dari?` dari ${dari}`:""}{sampai?` sampai ${sampai}`:""}</div>}
      </div>

      {sd.length===0?<div style={{textAlign:"center",padding:"30px 0",color:"#94a3b8",fontSize:13}}>Tidak ada data rekap untuk filter ini.</div>:
      sd.map(d=>{
        const le=Object.entries(byDate[d].lapis).sort((a,b)=>a[0].localeCompare(b[0]));
        const ke=Object.entries(byDate[d].kering).sort((a,b)=>a[0].localeCompare(b[0]));
        const lae=Object.entries(byDate[d].lainnya).sort((a,b)=>a[0].localeCompare(b[0]));
        return(
          <div key={d} style={{borderRadius:10,overflow:"hidden",border:"1px solid #e2e8f0",marginBottom:10}}>
            <div style={{background:B,color:"white",padding:"8px 14px",fontWeight:700,fontSize:13}}>📅 {d}</div>
            {le.length>0&&<><SL label="🍰 Kue Lapis" c={B} bg={BL}/>{le.map(([k,q])=>{const p=k.split("||");return(<IL key={k} nm={`${p[0]} ${p[1]} — ${p[2]}`} qty={q}/>);})}</>}
            {ke.length>0&&<><SL label="🍪 Kue Kering" c="#92400e" bg="#fef9c3"/>{ke.map(([n,q])=><IL key={n} nm={n} qty={q}/>)}</>}
            {lae.length>0&&<><SL label="📦 Lainnya" c="#374151" bg="#f1f5f9"/>{lae.map(([n,q])=><IL key={n} nm={n} qty={q}/>)}</>}
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────
export default function App(){
  const[user,setUser]=useState(null);
  const[lf,setLF]=useState({username:"",password:"",error:"",show:false});
  const[tab,setTab]=useState("order");
  const[sett,setSett]=useState({...DEFAULT_SETT});
  const[showSet,setShowSet]=useState(false);
  const[settSaved,setSettSaved]=useState(false);

  // Load settings dari storage saat pertama kali
  useEffect(()=>{
    (async()=>{
      try{
        const r=await window.storage.get("keik-settings");
        if(r&&r.value){
          const s={...DEFAULT_SETT,...JSON.parse(r.value)};
          setSett(s);
          if(s.supaUrl&&s.supaKey)SB.init(s.supaUrl,s.supaKey);
        }else if(DEFAULT_SETT.supaUrl&&DEFAULT_SETT.supaKey){
          SB.init(DEFAULT_SETT.supaUrl,DEFAULT_SETT.supaKey);
        }
      }catch(e){}
    })();
  },[]);

  const saveSettings=async()=>{
    try{
      await window.storage.set("keik-settings",JSON.stringify(sett));
      if(sett.supaUrl&&sett.supaKey){SB.init(sett.supaUrl,sett.supaKey);loadOrders();loadBoxData();}
      setSettSaved(true);
      setTimeout(()=>setSettSaved(false),2000);
    }catch(e){alert("Gagal menyimpan settings.");}
  };
  const[raw,setRaw]=useState("");
  const[parsing,setParsing]=useState(false);
  const[form,setForm]=useState(emptyForm());
  const[items,setItems]=useState([mkItem()]);
  const[ong,setOng]=useState(emptyOng());
  const[disc,setDisc]=useState(emptyDisc());
  const[pesan,setPesan]=useState("");
  const[orders,setOrders]=useState([]);
  const busy=useRef(false);
  const[copied,setCopied]=useState(false);
  const[cc,setCC]=useState(false);
  const[invStep,setInvStep]=useState(1);
  const[invSearch,setInvSearch]=useState("");
  const[invCust,setInvCust]=useState(null);
  const[invOrder,setInvOrder]=useState(null);
  const[invNum,setInvNum]=useState("");
  const[invEdit,setInvEdit]=useState({nama:"",noHp:"",alamat:""});
  const[invEditing,setInvEditing]=useState(false);
  const[editModal,setEditModal]=useState(null);
  const[editForm,setEditForm]=useState({});
  const[histSearch,setHistSearch]=useState("");
  const[histSort,setHistSort]=useState("tanggal");
  const[histDetail,setHistDetail]=useState(null);
  const[refundModal,setRefundModal]=useState(null);
  const[removeModal,setRemoveModal]=useState(null);
  const[listFilter,setListFilter]=useState("");
  const[histDari,setHistDari]=useState("");
  const[histSampai,setHistSampai]=useState("");
  const mkBoxInv=()=>{const o={};BOX_TYPES.forEach(bt=>{o[bt]={};BOX_CATS.forEach(c=>{o[bt][c]=0;});});return o;};
  const mkBoxActive=()=>{const o={};BOX_TYPES.forEach(bt=>{o[bt]={};BOX_CATS.forEach(c=>{o[bt][c]=true;});});return o;};
  const[boxInv,setBoxInv]=useState(mkBoxInv);
  const[boxActive,setBoxActive]=useState(mkBoxActive);
  const[boxLogs,setBoxLogs]=useState([]);
  const[boxAction,setBoxAction]=useState(null);
  const[boxAQty,setBoxAQty]=useState(1);
  const[boxACat,setBoxACat]=useState("Box Biasa");
  const[boxAKet,setBoxAKet]=useState("");

  // ── SUPABASE DATA LOADING ──
  // ── SUPABASE DATA LOADING ──
  const loadOrders=async()=>{
    if(!SB.ok())return;
    try{
      const data=await SB.get("orders","select=*&order=ts.desc");
      if(Array.isArray(data)&&data.length>0){
        setOrders(data.map(o=>({
          id:Number(o.id),
          nama:o.nama||"",
          noHp:o.no_hp||"",
          alamat:o.alamat||"",
          tanggalKirim:o.tanggal_kirim||"",
          pengiriman:o.pengiriman||"Pickup",
          jenisBox:o.jenis_box||"",
          keterangan:o.keterangan||"",
          status:o.status||"NOT PAID",
          historyStatus:o.history_status||null,
          refundReason:o.refund_reason||null,
          items:Array.isArray(o.items)?o.items:[],
          ong:o.ong&&typeof o.ong==="object"?o.ong:{},
          discount:o.discount&&typeof o.discount==="object"?o.discount:{},
          subtotal:Number(o.subtotal||0),
          ongkirAmt:Number(o.ongkir_amt||0),
          discountAmt:Number(o.discount_amt||0),
          total:Number(o.total||0),
          pic:o.pic||"-",
          ts:o.ts||""
        })));
      }
      // Kalau Supabase return kosong tapi lokal ada data, JANGAN timpa — biarkan lokal tetap
    }catch(e){console.error("loadOrders error:",e);}
  };
  const loadBoxData=async()=>{
    if(!SB.ok()){
      // fallback: load dari persistent storage
      try{const r=await window.storage.get("keik-box");if(r&&r.value){const d=JSON.parse(r.value);if(d.inv)setBoxInv(d.inv);if(d.active)setBoxActive(d.active);}}catch(e){}
      return;
    }
    const data=await SB.get("box_inventory","select=*");
    if(data&&data.length>0){
      const inv={},act={};
      BOX_TYPES.forEach(bt=>{inv[bt]={};act[bt]={};BOX_CATS.forEach(c=>{inv[bt][c]=0;act[bt][c]=true;});});
      data.forEach(r=>{if(inv[r.box_type]){inv[r.box_type][r.box_cat]=r.qty||0;act[r.box_type][r.box_cat]=r.active!==false;}});
      setBoxInv(inv);setBoxActive(act);
    }
    const logs=await SB.get("box_logs","select=*&order=created_at.desc&limit=200");
    if(logs)setBoxLogs(logs.map(l=>({id:l.id,boxType:l.box_type,boxCat:l.box_cat,action:l.action,qty:l.qty,keterangan:l.keterangan||"-",timestamp:l.log_timestamp||""})));
  };

  // Load data on mount + auto-refresh setiap 15 detik
  useEffect(()=>{
    const t=setTimeout(()=>{if(SB.ok()){loadOrders();loadBoxData();}},1500);
    const iv=setInterval(()=>{if(SB.ok()&&!busy.current){loadOrders();loadBoxData();}},15000);
    return()=>{clearTimeout(t);clearInterval(iv);};
  },[]);

  // Fallback: load box dari persistent storage jika Supabase belum di-setup
  useEffect(()=>{
    if(!SB.ok()){
      (async()=>{
        try{const r=await window.storage.get("keik-box");if(r&&r.value){const d=JSON.parse(r.value);if(d.inv)setBoxInv(d.inv);if(d.active)setBoxActive(d.active);if(d.logs)setBoxLogs(d.logs);}}catch(e){}
      })();
    }
  },[]);
  const saveBox=async(inv,active,logs)=>{
    try{await window.storage.set("keik-box",JSON.stringify({inv,active,logs}));}catch(e){}
    // Also save to Supabase if available
    if(SB.ok()){
      for(const bt of BOX_TYPES){for(const bc of BOX_CATS){
        await SB.updBox(bt,bc,{qty:inv[bt]?.[bc]||0,active:active[bt]?.[bc]!==false});
      }}
    }
  };
  const boxTotal=(bt)=>BOX_CATS.reduce((s,c)=>s+(boxInv[bt]?.[c]||0),0);
  const boxLowCats=(bt)=>BOX_CATS.filter(c=>boxActive[bt]?.[c]&&(boxInv[bt]?.[c]||0)<5);
  const boxWarns=(()=>{const w=[];BOX_TYPES.forEach(bt=>{boxLowCats(bt).forEach(c=>w.push({bt,c,qty:boxInv[bt]?.[c]||0}));});return w;})();
  const BoxWarning=()=>boxWarns.length===0?null:(
    <div className="card" style={{borderLeft:"4px solid #dc2626",background:"#fff5f5",marginBottom:14}}>
      <h4 style={{margin:"0 0 8px",fontSize:14,fontWeight:700,color:"#dc2626"}}>⚠️ Peringatan Stok Box Menipis!</h4>
      {boxWarns.map((w,i)=><div key={i} style={{fontSize:13,color:"#dc2626",padding:"3px 0"}}>• <strong>{w.bt}</strong> — {w.c}: <strong>{w.qty} pcs</strong></div>)}
    </div>
  );

  const updF=(f,v)=>setForm(p=>({...p,[f]:v}));
  const updO=(f,v)=>setOng(p=>({...p,[f]:v}));
  const updS=(f,v)=>setSett(p=>({...p,[f]:v}));
  const calcOng=(o=ong)=>o.show?(o.type==="TIKI"?Number(o.berat||0)*Number(o.harga||0):o.type==="Instant"?Number(o.harga||0):0):0;
  const subtotal=items.reduce((s,i)=>s+Number(i.harga||0)*Number(i.qty||0),0);
  const total=subtotal+calcOng()-(disc.show?Number(disc.amount||0):0);
  const pending=orders.filter(o=>o.status==="NOT PAID");
  const paid=orders.filter(o=>o.status==="PAID"&&!o.historyStatus);
  const filtPaid=listFilter?paid.filter(o=>o.tanggalKirim===listFilter):paid;
  const hist=orders.filter(o=>o.historyStatus==="SEND"||o.historyStatus==="REFUND");
  const filtHist=hist
    .filter(o=>{
      if(!o.nama.toLowerCase().includes(histSearch.toLowerCase())) return false;
      if(!histDari&&!histSampai) return true;
      const d=parseDate(o.tanggalKirim);
      if(!d) return false;
      if(histDari){const dr=parseDate(histDari); if(dr&&d<dr) return false;}
      if(histSampai){const sp=parseDate(histSampai); if(sp&&d>sp) return false;}
      return true;
    })
    .sort((a,b)=>histSort==="alpha"?a.nama.localeCompare(b.nama):histSort==="tanggal"?(parseDate(b.tanggalKirim)||new Date(0))-(parseDate(a.tanggalKirim)||new Date(0)):0);

  const downloadHistCSV=()=>{
    const rows=[["Nama","No HP","Alamat","Tgl Kirim","Pengiriman","Box","Status","Orderan","Total"]];
    filtHist.forEach(o=>{
      const orderan=(o.items||[]).map(it=>itemLabel(it)+" x"+it.qty).join(", ");
      rows.push([o.nama,o.noHp,o.alamat,o.tanggalKirim||"-",o.pengiriman,o.jenisBox||"-",o.historyStatus||"-",orderan,o.total||0]);
    });
    const csv=rows.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n");
    const label=histDari&&histSampai?`${histDari}_sd_${histSampai}`:histDari?`dari_${histDari}`:histSampai?`sd_${histSampai}`:"semua";
    const a=document.createElement("a");
    a.href="data:text/csv;charset=utf-8,"+encodeURIComponent("\ufeff"+csv);
    a.download=`history_order_${label}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const boxOp=async(its,sign,jenisBox)=>{
    const cat=BOX_CATS.includes(jenisBox)?jenisBox:"Box Biasa";
    const d={"Box Besar":0,"Box Bites":0,"Box 10x10":0,"Box 11x22":0};
    its.forEach(it=>{if(it.kat!=="lapis")return;const bt=BOX_MAP[it.produk];if(bt)d[bt]+=Number(it.qty||0);});
    setBoxInv(p=>{
      const u=JSON.parse(JSON.stringify(p));
      Object.keys(d).forEach(k=>{if(d[k]>0){if(!u[k])u[k]={};u[k][cat]=Math.max(0,(u[k][cat]||0)+sign*d[k]);}});
      saveBox(u,boxActive,boxLogs);
      return u;
    });
    const logs=Object.entries(d).filter(([,q])=>q>0).map(([bt,q])=>({id:Date.now()+Math.random(),boxType:bt,boxCat:cat,action:sign>0?"add":"less",qty:q,keterangan:sign>0?"Auto: order dibatalkan":"Auto: order masuk",timestamp:fmtTs()}));
    if(logs.length){
      setBoxLogs(p=>{const nl=[...logs,...p];saveBox(boxInv,boxActive,nl);return nl;});
      if(SB.ok())for(const lg of logs)await SB.ins("box_logs",{box_type:lg.boxType,box_cat:lg.boxCat,action:lg.action,qty:lg.qty,keterangan:lg.keterangan,log_timestamp:lg.timestamp});
    }
  };

  // ── Supabase order helper: convert local → Supabase columns ──
  const toSupa=(o)=>({id:o.id,nama:o.nama,no_hp:o.noHp,alamat:o.alamat,tanggal_kirim:o.tanggalKirim,pengiriman:o.pengiriman,jenis_box:o.jenisBox||"",keterangan:o.keterangan||"",status:o.status||"NOT PAID",history_status:o.historyStatus||null,refund_reason:o.refundReason||null,items:o.items||[],ong:o.ong||{},discount:o.discount||{},subtotal:o.subtotal||0,ongkir_amt:o.ongkirAmt||0,discount_amt:o.discountAmt||0,total:o.total||0,pic:o.pic||user?.name||"-"});

  const postSheet=(url,body)=>{
    if(!url)return;
    try{
      // Gunakan hidden form + iframe (tembus sandbox artifact)
      const iframeName="sheets_iframe_"+Date.now();
      let iframe=document.createElement("iframe");
      iframe.name=iframeName;
      iframe.style.cssText="position:absolute;width:0;height:0;border:0;visibility:hidden";
      document.body.appendChild(iframe);

      const form=document.createElement("form");
      form.method="POST";
      form.action=url;
      form.target=iframeName;
      form.enctype="application/x-www-form-urlencoded";
      form.style.display="none";

      const input=document.createElement("input");
      input.type="hidden";
      input.name="data";
      input.value=JSON.stringify(body);
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();

      // Cleanup setelah 10 detik
      setTimeout(()=>{try{document.body.removeChild(form);document.body.removeChild(iframe);}catch(e){}},10000);
    }catch(e){console.error("postSheet error:",e);}
  };
  const syncToSheets=async o=>{
    const sum=(o.items||[]).map(it=>itemLabel(it)+" x"+it.qty).join(", ");
    const totalQty=(o.items||[]).reduce((s,i)=>s+Number(i.qty||0),0);
    const ongType=o.ong?.show?o.ong.type:"Pickup";
    await postSheet(sett.sheetsUrl,{
      sheetType:"master",
      timestamp:new Date().toLocaleString("id-ID"),
      nama:o.nama,noHp:o.noHp,alamat:o.alamat,
      tanggalKirim:o.tanggalKirim,pengiriman:o.pengiriman,jenisBox:o.jenisBox||"-",
      orderan:sum,totalQty,
      subtotal:o.subtotal||0,ongkirType:ongType,ongkirAmt:o.ongkirAmt||0,
      discountAmt:o.discountAmt||0,total:o.total||0,
      keterangan:o.keterangan||"-",status:o.status,
      pic:user?.name||"-"
    });
    await postSheet(sett.sheetsUrlStaff,{
      sheetType:"staff",
      nama:o.nama,noHp:o.noHp,alamat:o.alamat,
      tanggalKirim:o.tanggalKirim,pengiriman:o.pengiriman,jenisBox:o.jenisBox||"-",
      orderan:sum,totalQty,keterangan:o.keterangan||"-"
    });
  };

  const markAsPaid=async id=>{
    busy.current=true;
    try{
      const nid=Number(id);
      const o=orders.find(x=>Number(x.id)===nid);
      setOrders(p=>p.map(x=>Number(x.id)!==nid?x:{...x,status:"PAID"}));
      if(SB.ok()){
        const ok=await SB.upd("orders",nid,{status:"PAID"});
        if(ok){await new Promise(r=>setTimeout(r,500));await loadOrders();}
      }
      if(o)await syncToSheets({...o,status:"PAID"});
    }catch(e){console.error("markAsPaid error:",e);}
    finally{setTimeout(()=>{busy.current=false;},2000);}
  };
  const markSend=async id=>{
    busy.current=true;
    try{
      const nid=Number(id);
      setOrders(p=>p.map(o=>Number(o.id)!==nid?o:{...o,historyStatus:"SEND"}));
      if(SB.ok()){
        const ok=await SB.upd("orders",nid,{history_status:"SEND"});
        if(ok){await new Promise(r=>setTimeout(r,500));await loadOrders();}
      }
    }catch(e){console.error("markSend error:",e);}
    finally{setTimeout(()=>{busy.current=false;},2000);}
  };
  const[editItems,setEditItems]=useState([]);
  const openEdit=o=>{setEditModal(o);setEditForm({nama:o.nama,noHp:o.noHp,alamat:o.alamat,tanggalKirim:o.tanggalKirim,pengiriman:o.pengiriman,jenisBox:o.jenisBox,keterangan:o.keterangan,status:o.status});setEditItems(JSON.parse(JSON.stringify(o.items||[])));};
  const editSubtotal=editItems.reduce((s,i)=>s+Number(i.harga||0)*Number(i.qty||0),0);
  const editTotal=editSubtotal-(editModal?.discountAmt||0)+(editModal?.ongkirAmt||0);
  const saveEdit=async()=>{
    busy.current=true;
    try{
      const nid=Number(editModal.id);
      const updated={...editForm,items:editItems,subtotal:editSubtotal,total:editTotal};
      setOrders(p=>p.map(o=>Number(o.id)!==nid?o:{...o,...updated}));
      if(SB.ok()){
        const ok=await SB.upd("orders",nid,{nama:editForm.nama,no_hp:editForm.noHp,alamat:editForm.alamat,tanggal_kirim:editForm.tanggalKirim,pengiriman:editForm.pengiriman,jenis_box:editForm.jenisBox,keterangan:editForm.keterangan,status:editForm.status,items:editItems,subtotal:editSubtotal,total:editTotal});
        if(ok){await new Promise(r=>setTimeout(r,500));await loadOrders();}
      }
    }catch(e){console.error("saveEdit error:",e);}
    finally{setTimeout(()=>{busy.current=false;},2000);}
    setEditModal(null);
  };
  const clearOrder=()=>{setForm(emptyForm());setItems([mkItem()]);setOng(emptyOng());setDisc(emptyDisc());setPesan("");setRaw("");setCC(false);};
  const saveOrder=async()=>{
    busy.current=true;
    try{
      const o={...form,items,ong,discount:disc,subtotal,ongkirAmt:calcOng(),discountAmt:disc.show?Number(disc.amount):0,total,id:Date.now(),ts:new Date().toISOString(),pic:user?.name||"-"};
      setOrders(p=>[o,...p]);
      if(SB.ok()){
        const result=await SB.ins("orders",toSupa(o));
        if(!result)console.warn("Insert gagal, order hanya tersimpan lokal");
      }
      boxOp(items,-1,form.jenisBox);clearOrder();alert("✅ Order berhasil disimpan!");
    }catch(e){console.error("saveOrder error:",e);}
    finally{setTimeout(()=>{busy.current=false;},3000);}
  };
  const copyPesan=()=>{
    try{const el=document.createElement("textarea");el.value=pesan;el.style.cssText="position:fixed;opacity:0;top:0;left:0";document.body.appendChild(el);el.select();document.execCommand("copy");document.body.removeChild(el);}
    catch(e){navigator.clipboard.writeText(pesan).catch(()=>alert("Gagal copy."));}
    setCopied(true);setTimeout(()=>setCopied(false),2000);
  };
  const genPesan=()=>{
    const lines=items.map((it,i)=>`${i+1}. ${itemLabel(it)} x${it.qty} = ${rp(it.harga*it.qty)}`).join("\n");
    const og=ong.show&&ong.type!=="Pickup"?(ong.type==="TIKI"?`\n🚚 Ongkir TIKI (${ong.berat}kg x ${rp(ong.harga)}) = ${rp(calcOng())}`:`\n🛵 Ongkir Instant (${ong.kendaraan}) = ${rp(calcOng())}`):""
    const dc=disc.show&&disc.amount>0?`\n🏷️ Discount = -${rp(disc.amount)}`:"";
    setPesan(`📦 *ORDER BARU*\n━━━━━━━━━━━━━━\n👤 Nama      : ${form.nama}\n📍 Alamat    : ${form.alamat}\n📱 No HP     : ${form.noHp}\n📅 Kirim     : ${form.tanggalKirim}\n🚚 Pengiriman: ${form.pengiriman}\n📦 Box       : ${form.jenisBox}\n\n🛒 *ORDERAN:*\n${lines}${og}${dc}\n\n💰 *TOTAL: ${rp(total)}*${form.keterangan?"\n\n📝 Ket: "+form.keterangan:""}\n\n━━━━━━━━━━━━━━\n💳 Transfer ke REKENING BCA\n*5271350849 - Geraldi Jehosam S*\n\nOrderan akan masuk ke dalam list setelah melakukan pembayaran dan sertakan bukti pembayaran\n\nTerima kasih\n\n_Keik Cakery_ 🍰`);
  };
  const parseAI=async()=>{
    if(!raw.trim())return; setParsing(true);
    try{
      const t=raw;
      const find=(regex)=>{const m=t.match(regex);return m?m[1].trim():"";};
      // Nama
      let nama=find(/(?:nama|Nama|NAMA)\s*[:\-]?\s*(.+)/i);
      // No HP — deteksi sequence angka 10-15 digit dengan optional +/-/spaces
      const hpMatch=t.match(/(?:hp|HP|wa|WA|telp|nomor|no\.?\s*hp|no\.?\s*telp|phone)\s*[:\-]?\s*([\+\-\s\d]{9,20})/i)||t.match(/(\+?62[\-\s\d]{9,16})/)||t.match(/(08[\-\s\d]{8,14})/);
      let noHp=hpMatch?hpMatch[1].replace(/[\s\-]/g,""):"";
      if(noHp.startsWith("+62"))noHp="0"+noHp.slice(3);
      if(noHp.startsWith("62"))noHp="0"+noHp.slice(2);
      // Alamat — cari pattern "Alamat:" atau keyword lokasi
      let alamat=find(/(?:alamat|Alamat|ALAMAT)\s*[:\-]?\s*(.+?)(?:\n\n|\n[A-Z][a-z]+\s*[:\-]|$)/s);
      if(!alamat){
        // Fallback: cari baris yang mengandung keyword lokasi
        const lines=t.split(/\n/);
        for(const line of lines){
          if(/\b(jl\.?|jalan|apartemen|apt\.?|ruko|toko|perumahan|kompleks|komp\.?|blok|rt\/?rw|kelurahan|kecamatan|desa)\b/i.test(line)){
            alamat=line.trim();
            break;
          }
        }
      }
      // Tanggal kirim DD-MM-YYYY atau DD/MM/YYYY
      const tgMatch=t.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
      let tanggalKirim="";
      if(tgMatch){const y=tgMatch[3].length===2?"20"+tgMatch[3]:tgMatch[3];tanggalKirim=`${tgMatch[1].padStart(2,"0")}-${tgMatch[2].padStart(2,"0")}-${y}`;}
      // Pengiriman
      let pengiriman="Pickup";
      if(/tiki/i.test(t))pengiriman="TIKI";
      else if(/instant|grab|gojek|gosend/i.test(t))pengiriman="Instant";
      // Jenis box
      let jenisBox="";
      if(/sincia/i.test(t))jenisBox="Sincia";
      else if(/imlek/i.test(t))jenisBox="Imlek";
      else if(/natal/i.test(t))jenisBox="Natal";
      else if(/polos/i.test(t))jenisBox="Polos";
      else if(/biasa/i.test(t))jenisBox="Box Biasa";
      // Items — cari produk KEIK
      const foundItems=[];
      const lapisProducts=[["Lapis Bulat","lapis\\s*bulat"],["Lapis Persegi","lapis\\s*persegi"],["Lapis 11x22","lapis\\s*11\\s*x\\s*22|11\\s*x\\s*22"],["Lapis 10x10","lapis\\s*10\\s*x\\s*10|10\\s*x\\s*10"],["Lapis Mini Bites","mini\\s*bites|lapis\\s*mini"],["Lapis Mix 4 Rasa","mix\\s*4\\s*rasa|mix\\s*rasa"]];
      const keringProducts=[["Nastar Wisman","nastar"],["Kastengel","kastengel|kastengels"],["Lidah Kucing","lidah\\s*kucing"],["Putri Salju","putri\\s*salju"],["Semprit Mawar","semprit"],["Sagu Keju","sagu\\s*keju"]];
      const rasaList=["Original","Plum","Keju","Coklat","Almond","Nanas"];
      // Parse per line untuk items
      t.split(/\n/).forEach(line=>{
        const qtyMatch=line.match(/\b(\d+)\s*(?:pcs|box|buah|x|pc|\*)?\b/i);
        const qty=qtyMatch?parseInt(qtyMatch[1]):1;
        lapisProducts.forEach(([name,pat])=>{
          if(new RegExp(pat,"i").test(line)){
            const mentega=/wisman|wysman/i.test(line)?"Wisman":"Butter";
            let rasa="Original";
            for(const r of rasaList){if(new RegExp(r,"i").test(line)){rasa=r;break;}}
            const harga=autoPrice("lapis",name,mentega,rasa);
            foundItems.push({...mkItem(),kat:"lapis",produk:name,mentega,rasa,qty,harga});
          }
        });
        keringProducts.forEach(([name,pat])=>{
          if(new RegExp(pat,"i").test(line)){
            const harga=autoPrice("kering",name);
            foundItems.push({...mkItem(),kat:"kering",produk:name,qty,harga});
          }
        });
      });
      setForm(f=>({...f,nama,alamat,noHp,tanggalKirim,pengiriman,jenisBox,keterangan:f.keterangan}));
      if(foundItems.length)setItems(foundItems);
      alert(`✅ Parse selesai!\nDitemukan: ${foundItems.length} item\nSilakan cek & lengkapi data yang belum terisi.`);
    }catch(e){alert("Gagal parse. Silakan isi manual.");}
    setParsing(false);
  };
  const handleLogin=()=>{const u=USERS.find(u=>u.username===lf.username&&u.password===lf.password);u?setUser(u):setLF(p=>({...p,error:"Username atau password salah."}));};
  const resetInv=()=>{setInvStep(1);setInvCust(null);setInvOrder(null);setInvNum("");setInvSearch("");setInvEditing(false);};
  const[invPreview,setInvPreview]=useState(null);
  const[invTempNama,setInvTempNama]=useState("");
  const[invTempHp,setInvTempHp]=useState("");
  const[invTempAlamat,setInvTempAlamat]=useState("");
  const canvasRef=useRef(null);

  const printInvoice=(ord)=>{
    if(!ord)return;
    setInvTempNama(ord.nama||"");
    setInvTempHp(ord.noHp||"");
    setInvTempAlamat(ord.alamat||"");
    setInvPreview({order:ord,num:mkInvNum()});
  };

  const drawInvoice=(canvas,o,num,nm,hp,al)=>{
    if(!canvas)return;
    const W=800,H=1200;
    canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext("2d");
    ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);
    let y=40;
    // Header
    ctx.fillStyle=B;ctx.font="bold 28px Arial";ctx.fillText("KEIK CAKERY",30,y+25);
    ctx.fillStyle=B;ctx.font="bold 32px Arial";ctx.textAlign="right";ctx.fillText("INVOICE",W-30,y+10);
    ctx.font="13px Arial";ctx.fillStyle="#64748b";ctx.fillText(num,W-30,y+30);
    ctx.textAlign="left";
    y+=50;ctx.fillStyle=B;ctx.fillRect(30,y,W-60,3);y+=20;
    // Kepada
    ctx.fillStyle=B;ctx.font="bold 10px Arial";ctx.fillText("KEPADA",30,y);y+=16;
    ctx.fillStyle="#1e293b";ctx.font="bold 15px Arial";ctx.fillText(nm,30,y);y+=18;
    ctx.font="13px Arial";ctx.fillStyle="#475569";ctx.fillText("📱 "+hp,30,y);y+=16;
    ctx.fillText("📍 "+al,30,y);y+=24;
    // Detail
    ctx.fillStyle=B;ctx.font="bold 10px Arial";ctx.fillText("DETAIL ORDER",30,y);y+=16;
    ctx.font="13px Arial";ctx.fillStyle="#475569";
    ctx.fillText("Tgl Kirim: "+(o.tanggalKirim||"-"),30,y);y+=16;
    ctx.fillText("Pengiriman: "+(o.pengiriman||"-"),30,y);y+=16;
    ctx.fillText("Box: "+(o.jenisBox||"-"),30,y);y+=30;
    // Table header
    ctx.fillStyle=B;ctx.fillRect(30,y,W-60,32);
    ctx.fillStyle="#fff";ctx.font="bold 12px Arial";
    ctx.fillText("No",42,y+21);ctx.fillText("Produk",80,y+21);
    ctx.textAlign="center";ctx.fillText("Qty",520,y+21);
    ctx.textAlign="right";ctx.fillText("Harga",630,y+21);ctx.fillText("Subtotal",750,y+21);
    ctx.textAlign="left";y+=32;
    // Table rows
    const items=o.items||[];
    items.forEach((it,i)=>{
      const sub=Number(it.harga||0)*Number(it.qty||0);
      const bg=i%2===0?"#fff":"#FFF5F3";
      ctx.fillStyle=bg;ctx.fillRect(30,y,W-60,28);
      ctx.fillStyle="#64748b";ctx.font="12px Arial";ctx.fillText(String(i+1),42,y+19);
      ctx.fillStyle="#1e293b";ctx.font="13px Arial";ctx.fillText(itemLabel(it).substring(0,40),80,y+19);
      ctx.textAlign="center";ctx.fillText(String(it.qty),520,y+19);
      ctx.textAlign="right";ctx.fillText(rp(it.harga),630,y+19);ctx.font="bold 13px Arial";ctx.fillText(rp(sub),750,y+19);
      ctx.textAlign="left";ctx.font="13px Arial";y+=28;
    });
    y+=16;
    // Discount
    if((o.discountAmt||0)>0){ctx.fillStyle="#059669";ctx.font="13px Arial";ctx.textAlign="right";ctx.fillText("Discount: -"+rp(o.discountAmt),750,y);ctx.textAlign="left";y+=20;}
    // Total bar
    ctx.fillStyle=B;ctx.fillRect(W-280,y,250,36);
    ctx.fillStyle="#fff";ctx.font="bold 16px Arial";ctx.fillText("TOTAL",W-270,y+25);
    ctx.textAlign="right";ctx.fillText(rp(o.total),W-40,y+25);ctx.textAlign="left";
    y+=56;
    // Bank info
    ctx.fillStyle="#f8fafc";ctx.fillRect(30,y,W-60,80);ctx.strokeStyle="#e2e8f0";ctx.strokeRect(30,y,W-60,80);
    ctx.fillStyle="#1e293b";ctx.font="bold 13px Arial";ctx.fillText("💳 Transfer ke REKENING BCA",44,y+20);
    ctx.fillStyle=B;ctx.font="bold 15px Arial";ctx.fillText("5271350849 — Geraldi Jehosam S",44,y+40);
    ctx.fillStyle="#475569";ctx.font="12px Arial";ctx.fillText("Sertakan bukti pembayaran. Terima kasih 🍰 Keik Cakery",44,y+60);
    y+=100;
    // PAID/UNPAID stamp
    const isPaid=o.status==="PAID";
    ctx.save();ctx.translate(W-160,y);ctx.rotate(-0.08);
    ctx.strokeStyle=isPaid?"#059669":"#dc2626";ctx.lineWidth=4;
    ctx.strokeRect(0,0,130,40);
    ctx.fillStyle=isPaid?"#059669":"#dc2626";ctx.font="bold 24px Arial";ctx.textAlign="center";
    ctx.fillText(isPaid?"PAID":"UNPAID",65,30);ctx.restore();ctx.textAlign="left";
  };

  useEffect(()=>{
    if(invPreview&&canvasRef.current)drawInvoice(canvasRef.current,invPreview.order,invPreview.num,invTempNama,invTempHp,invTempAlamat);
  },[invPreview,invTempNama,invTempHp,invTempAlamat]);

  const downloadInvoice=()=>{
    if(!canvasRef.current)return;
    const link=document.createElement("a");
    link.download=`${invPreview.num}_${invTempNama.replace(/\s+/g,"_")}.png`;
    link.href=canvasRef.current.toDataURL("image/png");
    link.click();
  };

  // ── LOGIN ───────────────────────────────────────────────
  if(!user)return(
    <div style={{fontFamily:"system-ui,sans-serif",minHeight:"100vh",background:"#f8fafc",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{CSS}</style>
      <div className="card" style={{width:"100%",maxWidth:380,boxShadow:"0 4px 24px rgba(0,0,0,.07)"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:28}}><KeikLogo/></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><label className="lbl">Username</label><input value={lf.username} onChange={e=>setLF(p=>({...p,username:e.target.value,error:""}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Masukkan username" className="inp" style={{borderColor:lf.error?"#fca5a5":""}}/></div>
          <div><label className="lbl">Password</label>
            <div style={{position:"relative"}}>
              <input type={lf.show?"text":"password"} value={lf.password} onChange={e=>setLF(p=>({...p,password:e.target.value,error:""}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Masukkan password" className="inp" style={{paddingRight:40,borderColor:lf.error?"#fca5a5":""}}/>
              <button onClick={()=>setLF(p=>({...p,show:!p.show}))} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#94a3b8"}}>{lf.show?"🙈":"👁️"}</button>
            </div>
          </div>
          {lf.error&&<div style={{background:"#fee2e2",color:"#dc2626",fontSize:13,padding:"8px 12px",borderRadius:8,textAlign:"center"}}>⚠️ {lf.error}</div>}
          <button className="btn" style={{background:B,color:"#fff",padding:11,fontSize:15,marginTop:4}} onClick={handleLogin}>Masuk</button>
        </div>
      </div>
    </div>
  );

  const tabs=[["order","📝 Input Order"],["pending",`⏳ Pending (${pending.length})`],["list",`✅ List (${paid.length})`],["history",`🗂️ History (${hist.length})`],["invoice","🧾 Invoice"]];
  if(user.isMaster)tabs.push(["box","📦 Sisa Box"]);
  const EF=(f,label,rest={})=><div><label className="lbl">{label}</label><input value={editForm[f]||""} onChange={e=>setEditForm(p=>({...p,[f]:e.target.value}))} className="inp" {...rest}/></div>;

  return(
    <div className="app">
      <style>{CSS}</style>

      {editModal&&(
        <Modal title="✏️ Edit Data Order" onClose={()=>setEditModal(null)} mw={700}>
          <div className="g2">
            {EF("nama","Nama")} {EF("noHp","No. HP")}
            <div style={{gridColumn:"1/-1"}}>{EF("alamat","Alamat")}</div>
            <div><label className="lbl">Tanggal Kirim</label><DateField value={editForm.tanggalKirim||""} onChange={v=>setEditForm(p=>({...p,tanggalKirim:v}))}/></div>
            <div><label className="lbl">Pengiriman</label><select value={editForm.pengiriman||""} onChange={e=>setEditForm(p=>({...p,pengiriman:e.target.value}))} className="inp">{PENGIRIMAN.map(o=>(<option key={o}>{o}</option>))}</select></div>
            <div><label className="lbl">Jenis Box</label><select value={editForm.jenisBox||""} onChange={e=>setEditForm(p=>({...p,jenisBox:e.target.value}))} className="inp"><option value="">-- Pilih --</option>{BOX_OPTIONS.map(o=>(<option key={o}>{o}</option>))}</select></div>
            <div><label className="lbl">Status</label><select value={editForm.status||""} onChange={e=>setEditForm(p=>({...p,status:e.target.value}))} className="inp"><option>NOT PAID</option><option>PAID</option></select></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">Keterangan</label><textarea value={editForm.keterangan||""} onChange={e=>setEditForm(p=>({...p,keterangan:e.target.value}))} rows={2} className="inp" style={{resize:"vertical"}}/></div>
          </div>

          <div style={{marginTop:16,borderTop:"2px solid #e2e8f0",paddingTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <h4 style={{margin:0,fontSize:14,fontWeight:700}}>🛒 Item Orderan</h4>
              <button className="btn" style={{background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe",fontSize:12}} onClick={()=>setEditItems(p=>[...p,mkItem()])}>+ Tambah Item</button>
            </div>
            {editItems.map((it,idx)=>{
              const si={width:"100%",padding:"6px 8px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:12,background:"#fff"};
              const isL=it.kat==="lapis";
              const mopts=(LAPIS.find(p=>p.name===it.produk)||{mentega:["Butter"]}).mentega;
              const upd=(f,v)=>{setEditItems(p=>p.map((x,i)=>i!==idx?x:updItem(x,f,v)));};
              return(
                <div key={idx} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:10,marginBottom:6}}>
                  <div style={{display:"flex",gap:6,alignItems:"end",flexWrap:"wrap"}}>
                    <div style={{minWidth:90}}><label style={{fontSize:10,color:"#94a3b8"}}>Kategori</label><select value={it.kat} onChange={e=>upd("kat",e.target.value)} style={si}><option value="lapis">Lapis</option><option value="kering">Kering</option><option value="lainnya">Lainnya</option></select></div>
                    {it.kat==="lainnya"?(
                      <div style={{flex:1}}><label style={{fontSize:10,color:"#94a3b8"}}>Keterangan</label><input value={it.keterangan||""} onChange={e=>upd("keterangan",e.target.value)} style={si} placeholder="Nama item..."/></div>
                    ):(
                      <div style={{flex:1}}><label style={{fontSize:10,color:"#94a3b8"}}>Produk</label><select value={it.produk} onChange={e=>upd("produk",e.target.value)} style={si}><option value="">-- Pilih --</option>{(isL?LAPIS.map(p=>p.name):KERING).map(p=>(<option key={p}>{p}</option>))}</select></div>
                    )}
                    {isL&&(<><div style={{minWidth:80}}><label style={{fontSize:10,color:"#94a3b8"}}>Mentega</label><select value={it.mentega} onChange={e=>upd("mentega",e.target.value)} style={si}>{mopts.map(m=>(<option key={m}>{m}</option>))}</select></div>
                    <div style={{minWidth:80}}><label style={{fontSize:10,color:"#94a3b8"}}>Rasa</label><select value={it.rasa} onChange={e=>upd("rasa",e.target.value)} style={si}>{RASA.map(r=>(<option key={r}>{r}</option>))}</select></div></>)}
                    <div style={{width:55}}><label style={{fontSize:10,color:"#94a3b8"}}>Qty</label><input type="number" min="1" value={it.qty} onChange={e=>upd("qty",e.target.value)} style={si}/></div>
                    <div style={{width:90}}><label style={{fontSize:10,color:"#94a3b8"}}>Harga</label><input type="number" min="0" value={it.harga} onChange={e=>upd("harga",e.target.value)} style={si}/></div>
                    <button onClick={()=>setEditItems(p=>p.filter((_,i)=>i!==idx))} style={{padding:"5px 7px",background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:12}}>✕</button>
                  </div>
                  <div style={{textAlign:"right",fontSize:11,color:"#64748b",marginTop:3}}>Subtotal: {rp(Number(it.harga||0)*Number(it.qty||0))}</div>
                </div>
              );
            })}
            <div style={{textAlign:"right",fontWeight:800,fontSize:16,color:"#1e293b",marginTop:8}}>
              Total: {rp(editTotal)}
              {editModal.ongkirAmt>0&&<span style={{fontSize:12,color:"#64748b",fontWeight:400,marginLeft:8}}>(termasuk ongkir {rp(editModal.ongkirAmt)})</span>}
              {editModal.discountAmt>0&&<span style={{fontSize:12,color:"#059669",fontWeight:400,marginLeft:8}}>(-{rp(editModal.discountAmt)} disc)</span>}
            </div>
          </div>

          <div style={{display:"flex",gap:8,marginTop:16,justifyContent:"flex-end"}}>
            <button className="btn" style={{background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0"}} onClick={()=>setEditModal(null)}>Batal</button>
            <button className="btn" style={{background:B,color:"#fff"}} onClick={saveEdit}>💾 Simpan Perubahan</button>
          </div>
        </Modal>
      )}

      {invPreview&&(
        <div className="overlay">
          <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:840,maxHeight:"95vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 8px 32px rgba(0,0,0,.2)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:"1px solid #e2e8f0",flexShrink:0}}>
              <h3 style={{margin:0,fontSize:16,fontWeight:700}}>🧾 {invPreview.num}</h3>
              <div className="row">
                <button className="btn" style={{background:"#059669",color:"#fff",fontSize:13}} onClick={downloadInvoice}>⬇️ Download PNG</button>
                <button onClick={()=>setInvPreview(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#94a3b8"}}>✕</button>
              </div>
            </div>

            <div style={{padding:"12px 20px",background:"#eff6ff",borderBottom:"1px solid #bfdbfe",flexShrink:0}}>
              <div style={{fontSize:12,fontWeight:700,color:"#1d4ed8",marginBottom:8}}>✏️ Edit Kepada (temporary — tidak mengubah data order)</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:150}}><label style={{fontSize:11,color:"#64748b"}}>Nama / PT</label><input value={invTempNama} onChange={e=>setInvTempNama(e.target.value)} className="inp" style={{fontSize:13}}/></div>
                <div style={{minWidth:140}}><label style={{fontSize:11,color:"#64748b"}}>No. HP</label><input value={invTempHp} onChange={e=>setInvTempHp(e.target.value)} className="inp" style={{fontSize:13}}/></div>
                <div style={{flex:1,minWidth:200}}><label style={{fontSize:11,color:"#64748b"}}>Alamat</label><input value={invTempAlamat} onChange={e=>setInvTempAlamat(e.target.value)} className="inp" style={{fontSize:13}}/></div>
              </div>
            </div>

            <div style={{overflow:"auto",padding:20,flex:1,display:"flex",justifyContent:"center",background:"#f1f5f9"}}>
              <canvas ref={canvasRef} style={{maxWidth:"100%",height:"auto",borderRadius:8,boxShadow:"0 2px 12px rgba(0,0,0,.1)"}}/>
            </div>
          </div>
        </div>
      )}

      {refundModal&&<ReasonModal title="🔄 Refund Reason" subtitle={`Customer: ${refundModal.nama}`} options={REFUND_R} confirmLabel="Konfirmasi Refund"
        onClose={()=>setRefundModal(null)}
        onConfirm={async r=>{
          busy.current=true;
          try{
            const nid=Number(refundModal.id);
            setOrders(p=>p.map(o=>Number(o.id)!==nid?o:{...o,historyStatus:"REFUND",refundReason:r}));
            if(SB.ok()){const ok=await SB.upd("orders",nid,{history_status:"REFUND",refund_reason:r});if(ok){await new Promise(rv=>setTimeout(rv,500));await loadOrders();}}
            await postSheet(sett.sheetsUrl,{sheetType:"refund",timestamp:new Date().toLocaleString("id-ID"),nama:refundModal.nama,noHp:refundModal.noHp,alamat:refundModal.alamat||"-",tanggalKirim:refundModal.tanggalKirim,pengiriman:refundModal.pengiriman,orderan:(refundModal.items||[]).map(it=>itemLabel(it)+" x"+it.qty).join(", "),total:refundModal.total,alasan:r,pic:user?.name||"-"});
            setRefundModal(null);
          }finally{setTimeout(()=>{busy.current=false;},2000);}
        }}/>}

      {removeModal&&<ReasonModal title="🗑️ Hapus Order" subtitle={`Alasan hapus order ${removeModal.nama}?`} options={REMOVE_R} confirmLabel="Hapus Order"
        onClose={()=>setRemoveModal(null)}
        onConfirm={async r=>{
          busy.current=true;
          try{
            boxOp(removeModal.items||[],1,removeModal.jenisBox);
            await postSheet(sett.sheetsUrl,{sheetType:"pembatalan",timestamp:new Date().toLocaleString("id-ID"),nama:removeModal.nama,noHp:removeModal.noHp,alamat:removeModal.alamat||"-",tanggalKirim:removeModal.tanggalKirim,pengiriman:removeModal.pengiriman,orderan:(removeModal.items||[]).map(it=>itemLabel(it)+" x"+it.qty).join(", "),total:removeModal.total,alasan:r,pic:user?.name||"-"});
            if(SB.ok()){const ok=await SB.del("orders",Number(removeModal.id));if(ok){await new Promise(rv=>setTimeout(rv,500));await loadOrders();}else{setOrders(p=>p.filter(o=>Number(o.id)!==Number(removeModal.id)));}}else{setOrders(p=>p.filter(o=>Number(o.id)!==Number(removeModal.id)));}
            setRemoveModal(null);
          }finally{setTimeout(()=>{busy.current=false;},2000);}
        }}/>}

      {histDetail&&(
        <Modal title="📋 Detail Order" onClose={()=>setHistDetail(null)}>
          <div style={{background:BL,borderRadius:10,padding:14,borderLeft:`4px solid ${B}`,marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:16}}>{histDetail.nama}</div>
            <div style={{fontSize:13,color:"#475569",marginTop:4}}>📱 {histDetail.noHp}</div>
            <div style={{fontSize:13,color:"#475569",marginTop:2}}>📍 {histDetail.alamat}</div>
            <div style={{fontSize:13,color:"#475569",marginTop:2}}>📅 {histDetail.tanggalKirim} · {histDetail.pengiriman} · {histDetail.jenisBox||"-"}</div>
          </div>
          <table style={{marginBottom:12}}>
            <thead><tr style={{background:B,color:"white"}}><th>Produk</th><th style={{textAlign:"center",width:50}}>Qty</th><th style={{textAlign:"right"}}>Subtotal</th></tr></thead>
            <tbody>{(histDetail.items||[]).map((it,i)=><tr key={i} style={{background:i%2===0?"#fff":BL}}><td>{itemLabel(it)}</td><td style={{textAlign:"center"}}>{it.qty}</td><td style={{textAlign:"right",fontWeight:600}}>{rp(it.harga*it.qty)}</td></tr>)}</tbody>
          </table>
          <div style={{textAlign:"right",fontWeight:800,fontSize:16,marginBottom:8}}>Total: {rp(histDetail.total)}</div>
          {histDetail.historyStatus==="REFUND"&&<div style={{background:"#fee2e2",borderRadius:8,padding:10,fontSize:13,color:"#dc2626"}}>🔄 Alasan: <strong>{histDetail.refundReason}</strong></div>}
        </Modal>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div><h2 style={{margin:0,fontSize:20,color:"#1e293b"}}>🍰 Order Manager</h2><p style={{margin:0,fontSize:12,color:"#94a3b8"}}>Halo, <strong>{user.name}</strong>{user.isMaster?" 👑":""} 👋</p></div>
        <div className="row">
          <button className="btn" style={{background:"#f1f5f9",color:"#475569",border:"1px solid #cbd5e1"}} onClick={()=>setShowSet(!showSet)}>⚙️ Settings</button>
          {user.isMaster&&sett.sheetViewUrl&&<a href={sett.sheetViewUrl} target="_blank" rel="noopener noreferrer"><button className="btn" style={{background:"#059669",color:"#fff",fontSize:12}}>📊 Sheet Master</button></a>}
          {sett.sheetViewUrlStaff&&<a href={sett.sheetViewUrlStaff} target="_blank" rel="noopener noreferrer"><button className="btn" style={{background:"#1d4ed8",color:"#fff",fontSize:12}}>📋 Sheet Karyawan</button></a>}
          <button className="btn" style={{background:"#fee2e2",color:"#dc2626",border:"1px solid #fecaca"}} onClick={()=>setUser(null)}>🚪 Logout</button>
        </div>
      </div>

      {/* NOTIFIKASI STOK BOX */}
      {(()=>{
        const lowBoxes=BOX_TYPES.filter(bt=>(boxInv[bt]||0)<200);
        if(lowBoxes.length===0) return null;
        return(
          <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:"12px 16px",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13,color:"#dc2626",marginBottom:8}}>⚠️ Peringatan Stok Box Menipis!</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {lowBoxes.map(bt=>(
                <div key={bt} style={{background:"#fff",border:"1px solid #fecaca",borderRadius:8,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:13,color:"#374151"}}>{bt}</span>
                  <span style={{fontWeight:900,fontSize:15,color:"#dc2626"}}>{boxInv[bt]||0}</span>
                  <span style={{fontSize:11,color:"#94a3b8"}}>pcs</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* SETTINGS — Karyawan: read-only, hanya link spreadsheet */}
      {showSet&&!user.isMaster&&(
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>⚙️ Settings</h3>
          <div style={{fontSize:13,color:"#475569",marginBottom:12}}>Login sebagai: <strong>{user.name}</strong></div>
          <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:12}}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>Nama Toko</div>
            <div style={{fontWeight:600,marginBottom:10}}>{sett.storeName}</div>
            <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>Alamat</div>
            <div style={{fontWeight:600,marginBottom:10}}>{sett.storeAddress||"-"}</div>
            <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>No. HP Toko</div>
            <div style={{fontWeight:600}}>{sett.storePhone||"-"}</div>
          </div>
          {sett.sheetViewUrlStaff&&(
            <a href={sett.sheetViewUrlStaff} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:12}}>
              <button className="btn" style={{background:"#1d4ed8",color:"#fff",fontSize:13,padding:"10px 20px"}}>📋 Buka Spreadsheet Karyawan</button>
            </a>
          )}
        </div>
      )}

      {/* SETTINGS — Master: full edit */}
      {showSet&&user.isMaster&&(
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>⚙️ Settings</h3>
          <div className="g2">
            <div><label className="lbl">Nama Toko</label><input value={sett.storeName} onChange={e=>updS("storeName",e.target.value)} className="inp"/></div>
            <div><label className="lbl">No. HP Toko</label><input value={sett.storePhone} onChange={e=>updS("storePhone",e.target.value)} className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">Alamat Toko</label><input value={sett.storeAddress} onChange={e=>updS("storeAddress",e.target.value)} className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">Upload Logo (Invoice)</label><div style={{display:"flex",gap:10,alignItems:"center",marginTop:4}}><input type="file" accept="image/*" onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>updS("logoBase64",ev.target.result);r.readAsDataURL(f);}}} style={{fontSize:12}}/>{sett.logoBase64&&<img src={sett.logoBase64} style={{height:44,borderRadius:6,border:"1px solid #e2e8f0"}}/>}</div></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">🔗 Google Sheets — Master (Script URL)</label><input value={sett.sheetsUrl} onChange={e=>updS("sheetsUrl",e.target.value)} placeholder="https://script.google.com/macros/s/..." className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">🔗 Google Sheets — Karyawan (Script URL)</label><input value={sett.sheetsUrlStaff} onChange={e=>updS("sheetsUrlStaff",e.target.value)} placeholder="https://script.google.com/macros/s/..." className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">📊 Link Spreadsheet — Master</label><input value={sett.sheetViewUrl||""} onChange={e=>updS("sheetViewUrl",e.target.value)} placeholder="https://docs.google.com/spreadsheets/d/..." className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">📋 Link Spreadsheet — Karyawan</label><input value={sett.sheetViewUrlStaff||""} onChange={e=>updS("sheetViewUrlStaff",e.target.value)} placeholder="https://docs.google.com/spreadsheets/d/..." className="inp"/></div>
            <div style={{gridColumn:"1/-1",borderTop:"2px solid #e2e8f0",paddingTop:12,marginTop:4}}>
              <div style={{fontSize:13,fontWeight:700,color:"#1d4ed8",marginBottom:8}}>🔗 Supabase (Multi-User Sync)</div>
            </div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">Supabase URL</label><input value={sett.supaUrl||""} onChange={e=>updS("supaUrl",e.target.value)} placeholder="https://xxxxx.supabase.co" className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">Supabase Anon Key</label><input value={sett.supaKey||""} onChange={e=>updS("supaKey",e.target.value)} placeholder="eyJhbGciOi..." className="inp" type="password"/></div>
            {sett.supaUrl&&sett.supaKey&&<div style={{gridColumn:"1/-1",background:"#f0fdf4",border:"1px solid #86efac",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#059669",fontWeight:600}}>✅ Supabase terhubung — data order & stok box akan sinkron untuk semua user</div>}
            {(!sett.supaUrl||!sett.supaKey)&&<div style={{gridColumn:"1/-1",background:"#fef9c3",border:"1px solid #fde68a",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#92400e"}}>⚠️ Supabase belum diisi — app berjalan mode lokal (data tidak shared antar user)</div>}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:14}}>
            <button className="btn" style={{background:settSaved?"#059669":B,color:"#fff",padding:"10px 24px",fontSize:14}} onClick={saveSettings}>{settSaved?"✅ Tersimpan!":"💾 Save Settings"}</button>
          </div>
        </div>
      )}

      <div className="row" style={{marginBottom:16}}>{tabs.map(([k,l])=><button key={k} className="btn" style={{background:tab===k?B:"#e2e8f0",color:tab===k?"white":"#374151"}} onClick={()=>setTab(k)}>{l}</button>)}</div>

      {tab==="order"&&<>
        <BoxWarning/>
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>🤖 Parse Data Mentah dengan AI</h3>
          <textarea value={raw} onChange={e=>setRaw(e.target.value)} rows={4} placeholder={"Nama: Budi\nHP: +628-1916-2022\nKirim: 10-04-2025, TIKI\nOrder: Lapis Bulat Keju x2"} className="inp" style={{resize:"vertical",height:90}}/>
          <button className="btn" style={{background:parsing||!raw.trim()?"#94a3b8":"#7c3aed",color:"#fff",marginTop:8}} onClick={parseAI} disabled={parsing||!raw.trim()}>{parsing?"⏳ Memproses...":"✨ Auto-Fill dari Teks"}</button>
        </div>
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>👤 Data Pelanggan</h3>
          <div className="g2">
            <div><label className="lbl">Nama Pelanggan</label><input value={form.nama} onChange={e=>updF("nama",e.target.value)} className="inp"/></div>
            <div><label className="lbl">No. HP</label><input value={form.noHp} onChange={e=>updF("noHp",e.target.value.replace(/\s/g,""))} className="inp"/></div>
            <div style={{gridColumn:"1/-1"}}><label className="lbl">Alamat</label><input value={form.alamat} onChange={e=>updF("alamat",e.target.value)} className="inp"/></div>
            <div><label className="lbl">Tanggal Kirim</label><DateField value={form.tanggalKirim} onChange={v=>updF("tanggalKirim",v)}/></div>
            <div><label className="lbl">Jenis Pengiriman</label><select value={form.pengiriman} onChange={e=>updF("pengiriman",e.target.value)} className="inp">{PENGIRIMAN.map(o=><option key={o}>{o}</option>)}</select></div>
            <div><label className="lbl">Jenis Box</label><select value={form.jenisBox} onChange={e=>updF("jenisBox",e.target.value)} className="inp"><option value="">-- Pilih Box --</option>{BOX_OPTIONS.map(o=><option key={o}>{o}</option>)}</select></div>
          </div>
        </div>
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>🛒 Orderan</h3>
          {items.map(it=><ItemRow key={it.id} item={it} onUpdate={(f,v)=>setItems(p=>p.map(x=>x.id===it.id?updItem(x,f,v):x))} onRemove={()=>setItems(p=>p.filter(x=>x.id!==it.id))}/>)}
          {ong.show&&(
            <div style={{marginTop:10,background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontWeight:700,fontSize:13,color:"#1d4ed8"}}>🚚 Ongkir</span>
                <button onClick={()=>setOng(emptyOng())} style={{background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontWeight:700}}>✕</button>
              </div>
              <div className="row">
                <div style={{minWidth:120}}><label className="lbl">Jenis</label><select value={ong.type} onChange={e=>updO("type",e.target.value)} className="inp"><option>Pickup</option><option>TIKI</option><option>Instant</option></select></div>
                {ong.type==="TIKI"&&<><div style={{minWidth:100}}><label className="lbl">Berat (kg)</label><input type="number" min="0" value={ong.berat} onChange={e=>updO("berat",e.target.value)} className="inp"/></div><div style={{minWidth:130}}><label className="lbl">Harga/kg</label><input type="number" min="0" value={ong.harga} onChange={e=>updO("harga",e.target.value)} className="inp"/></div><div style={{alignSelf:"flex-end",padding:"7px 12px",background:"#dbeafe",borderRadius:7,fontSize:13,fontWeight:700,color:"#1d4ed8"}}>= {rp(calcOng())}</div></>}
                {ong.type==="Instant"&&<><div style={{minWidth:100}}><label className="lbl">Kendaraan</label><select value={ong.kendaraan} onChange={e=>updO("kendaraan",e.target.value)} className="inp"><option>Bike</option><option>Car</option></select></div><div style={{minWidth:130}}><label className="lbl">Harga Ongkir</label><input type="number" min="0" value={ong.harga} onChange={e=>updO("harga",e.target.value)} className="inp"/></div></>}
                {ong.type==="Pickup"&&<p style={{margin:0,color:"#64748b",fontSize:12}}>Tidak ada biaya ongkir.</p>}
              </div>
            </div>
          )}
          {disc.show&&(
            <div style={{marginTop:8,background:"#fef9c3",border:"1px solid #fde68a",borderRadius:8,padding:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontWeight:700,fontSize:13,color:"#92400e"}}>🏷️ Discount</span>
                <button onClick={()=>setDisc(emptyDisc())} style={{background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontWeight:700}}>✕</button>
              </div>
              <div style={{maxWidth:200}}><label className="lbl">Total Discount (Rp)</label><input type="number" min="0" value={disc.amount} onChange={e=>setDisc(p=>({...p,amount:e.target.value}))} className="inp"/></div>
            </div>
          )}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,flexWrap:"wrap",gap:8}}>
            <div className="row">
              <button className="btn" style={{background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe"}} onClick={()=>setItems(p=>[...p,mkItem()])}>+ Tambah Item</button>
              <button className="btn" style={{background:ong.show?B:"#e0f2fe",color:ong.show?"white":"#0369a1",border:"1px solid #7dd3fc"}} onClick={()=>setOng(p=>({...p,show:!p.show}))}>🚚 Ongkir</button>
              <button className="btn" style={{background:disc.show?"#92400e":"#fef9c3",color:disc.show?"white":"#92400e",border:"1px solid #fde68a"}} onClick={()=>setDisc(p=>({...p,show:!p.show}))}>🏷️ Discount</button>
            </div>
            <div style={{textAlign:"right",fontSize:13,color:"#475569",lineHeight:"1.9"}}>
              {ong.show&&ong.type!=="Pickup"&&<><div>Subtotal: {rp(subtotal)}</div><div>Ongkir: +{rp(calcOng())}</div></>}
              {disc.show&&disc.amount>0&&<div style={{color:"#059669"}}>Discount: -{rp(disc.amount)}</div>}
              <div style={{fontWeight:800,fontSize:16,color:"#1e293b"}}>Total: {rp(total)}</div>
            </div>
          </div>
        </div>
        <div className="card"><label className="lbl">📝 Keterangan Tambahan (opsional)</label><textarea value={form.keterangan} onChange={e=>updF("keterangan",e.target.value)} rows={2} className="inp" style={{resize:"vertical",marginTop:4}} placeholder="Catatan khusus..."/></div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button className="btn" style={{background:"#059669",color:"#fff",flex:1,padding:12,fontSize:15}} onClick={genPesan}>📨 Generate Pesan Order</button>
          {!cc?<button className="btn" style={{background:"#f1f5f9",color:"#dc2626",padding:12,border:"1px solid #fecaca",whiteSpace:"nowrap"}} onClick={()=>setCC(true)}>🗑️ Clear</button>
            :<div style={{display:"flex",gap:6,alignItems:"center",background:"#fff5f3",border:"1px solid #fecaca",borderRadius:8,padding:"6px 12px"}}>
              <span style={{fontSize:13,color:"#dc2626",fontWeight:600}}>Hapus semua?</span>
              <button className="btn" style={{background:"#dc2626",color:"#fff",padding:"5px 12px",fontSize:12}} onClick={clearOrder}>Ya</button>
              <button className="btn" style={{background:"#e2e8f0",color:"#374151",padding:"5px 12px",fontSize:12}} onClick={()=>setCC(false)}>Batal</button>
            </div>}
        </div>
        {pesan&&(
          <div className="card">
            <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>💬 Pesan Order</h3>
            <pre style={{background:"#f0fdf4",border:"1px solid #bbf7d0",padding:12,borderRadius:8,fontSize:13,whiteSpace:"pre-wrap",wordBreak:"break-word",margin:0}}>{pesan}</pre>
            <button className="btn" style={{background:copied?"#059669":"#10b981",color:"#fff",marginTop:10}} onClick={copyPesan}>{copied?"✅ Tersalin!":"📋 Copy Pesan"}</button>
            <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #e2e8f0",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
              <span style={{fontWeight:700}}>Status:</span>
              {["PAID","NOT PAID"].map(s=><label key={s} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}><input type="radio" name="status" value={s} checked={form.status===s} onChange={e=>updF("status",e.target.value)}/><span style={{fontWeight:700,color:s==="PAID"?"#059669":"#dc2626"}}>{s}</span></label>)}
              <button className="btn" style={{background:B,color:"#fff",marginLeft:"auto"}} onClick={saveOrder}>💾 Simpan Order</button>
            </div>
          </div>
        )}
      </>}

      {tab==="pending"&&(
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>⏳ Pending Order</h3>
          {pending.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#94a3b8"}}>Tidak ada pending order. 🎉</div>:
          pending.map(o=>(
            <div key={o.id} style={{background:"#fff",border:"1px solid #fde68a",borderRadius:10,padding:"12px 16px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <div><div style={{fontWeight:700,fontSize:15}}>{o.nama}</div><div style={{fontSize:12,color:"#64748b",marginTop:3}}>📱 {o.noHp} · 📅 {o.tanggalKirim||"-"} · {o.pengiriman}</div><div style={{fontSize:12,color:"#64748b",marginTop:2}}>💰 {rp(o.total)}</div></div>
                <div className="row">
                  <Badge status="NOT PAID"/>
                  <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",background:"#f0fdf4",border:"1px solid #86efac",borderRadius:8,padding:"6px 12px"}}><input type="checkbox" onChange={()=>markAsPaid(o.id)} style={{width:16,height:16,cursor:"pointer",accentColor:"#059669"}}/><span style={{fontWeight:700,color:"#059669",fontSize:13}}>PAID</span></label>
                  <button className="btn" style={{background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0",fontSize:12,padding:"6px 10px"}} onClick={()=>openEdit(o)}>✏️ Edit</button>
                  <button className="btn" style={{background:"#fee2e2",color:"#dc2626",border:"1px solid #fecaca",fontSize:12,padding:"6px 10px"}} onClick={()=>setRemoveModal(o)}>🗑️ Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="list"&&(
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <h3 style={{margin:0,fontSize:15,fontWeight:700}}>✅ List Order — Lunas</h3>
            <div className="row"><span style={{fontSize:12,color:"#64748b"}}>Filter:</span><div style={{width:180}}><DateField value={listFilter} onChange={setListFilter} placeholder="Semua tanggal"/></div>{listFilter&&<button className="btn" style={{background:"#fee2e2",color:"#dc2626",padding:"5px 10px",fontSize:12,border:"1px solid #fecaca"}} onClick={()=>setListFilter("")}>✕</button>}</div>
          </div>
          {filtPaid.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#94a3b8"}}>Belum ada order lunas.</div>:<>
          <div style={{overflowX:"auto"}}>
            <table>
              <thead><tr>{["Nama","No HP","Tgl Kirim","Pengiriman","Total","Status",""].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>{filtPaid.map((o,i)=>(
                <tr key={o.id} style={{background:i%2===0?"#fff":"#f8fafc",borderBottom:"1px solid #f1f5f9"}}>
                  <td style={{fontWeight:600}}>{o.nama}</td><td style={{color:"#475569"}}>{o.noHp}</td><td style={{color:"#475569"}}>{o.tanggalKirim}</td><td style={{color:"#475569"}}>{o.pengiriman}</td><td style={{fontWeight:600}}>{rp(o.total)}</td><td><Badge status="PAID"/></td>
                  <td><div className="row">
                    <button className="btn" style={{background:"#d1fae5",color:"#059669",border:"1px solid #86efac",fontSize:12,padding:"5px 10px"}} onClick={()=>markSend(o.id)}>📦 SEND</button>
                    <button className="btn" style={{background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0",fontSize:12,padding:"5px 10px"}} onClick={()=>openEdit(o)}>✏️</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <RekapiSection orders={filtPaid}/>
          </>}
        </div>
      )}

      {tab==="history"&&(
        <div className="card">
          <div style={{marginBottom:14}}>
            <div className="row" style={{marginBottom:10}}>
              <input value={histSearch} onChange={e=>setHistSearch(e.target.value)} placeholder="🔍 Cari nama customer..." className="inp" style={{flex:1,minWidth:160}}/>
              {[["tanggal","📅"],["alpha","🔤"],["status","🏷️"]].map(([v,l])=><button key={v} className="btn" style={{background:histSort===v?B:"#f1f5f9",color:histSort===v?"white":"#374151",padding:"6px 12px",fontSize:12,border:`1px solid ${histSort===v?B:"#e2e8f0"}`}} onClick={()=>setHistSort(v)}>{l}</button>)}
            </div>
            <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:12}}>
              <div style={{display:"flex",gap:10,alignItems:"end",flexWrap:"wrap"}}>
                <div style={{minWidth:160}}>
                  <label className="lbl">📅 Dari Tanggal</label>
                  <DateField value={histDari} onChange={setHistDari} placeholder="DD-MM-YYYY"/>
                </div>
                <div style={{minWidth:160}}>
                  <label className="lbl">📅 Sampai Tanggal</label>
                  <DateField value={histSampai} onChange={setHistSampai} placeholder="DD-MM-YYYY"/>
                </div>
                {(histDari||histSampai)&&<button className="btn" style={{background:"#fee2e2",color:"#dc2626",border:"1px solid #fecaca",fontSize:12,padding:"7px 12px"}} onClick={()=>{setHistDari("");setHistSampai("");}}>✕ Reset</button>}
                {filtHist.length>0&&<button className="btn" style={{background:"#059669",color:"#fff",fontSize:12,padding:"7px 14px",marginLeft:"auto"}} onClick={downloadHistCSV}>⬇️ Download CSV</button>}
              </div>
              {(histDari||histSampai)&&<div style={{fontSize:12,color:"#1d4ed8",marginTop:8,fontWeight:600}}>Menampilkan {filtHist.length} order{histDari?` dari ${histDari}`:""}{histSampai?` sampai ${histSampai}`:""}</div>}
            </div>
          </div>
          {filtHist.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#94a3b8"}}>Tidak ada data history.</div>:
          filtHist.map(o=>{
            const isRef=o.historyStatus==="REFUND";
            return(
              <div key={o.id} style={{background:isRef?"#fff5f5":"#fff",border:`1px solid ${isRef?"#fecaca":"#e2e8f0"}`,borderRadius:10,padding:"12px 16px",marginBottom:8,borderLeft:`4px solid ${isRef?"#dc2626":"#059669"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <div>
                    <button onClick={()=>setHistDetail(o)} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><span style={{fontWeight:700,fontSize:15,color:B,textDecoration:"underline dotted"}}>{o.nama}</span></button>
                    <div style={{fontSize:12,color:"#64748b",marginTop:3}}>📱 {o.noHp} · 📅 {o.tanggalKirim||"-"} · {o.pengiriman}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>💰 {rp(o.total)}</div>
                    {isRef&&<div style={{fontSize:12,color:"#dc2626",marginTop:4,fontWeight:600}}>🔄 Alasan: {o.refundReason}</div>}
                  </div>
                  <div className="row">
                    <Badge status={o.historyStatus}/>
                    {!isRef&&<button className="btn" style={{background:"#dc2626",color:"#fff",fontSize:12,padding:"6px 12px"}} onClick={()=>setRefundModal(o)}>🔄 REFUND</button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab==="invoice"&&(
        <div className="card">
          <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>🧾 Generate Invoice</h3>
          <p style={{fontSize:12,color:"#94a3b8",margin:"0 0 12px"}}>Cari order, lalu klik Generate untuk membuat invoice.</p>
          <input value={invSearch} onChange={e=>setInvSearch(e.target.value)} placeholder="🔍 Cari nama atau No. HP..." className="inp" style={{marginBottom:14}}/>
          {orders.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#94a3b8"}}>Belum ada order.</div>:
          orders
            .filter(o=>o.nama.toLowerCase().includes(invSearch.toLowerCase())||o.noHp.includes(invSearch))
            .map(o=>(
              <div key={o.id} style={{padding:"12px 16px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{fontWeight:700,fontSize:15}}>{o.nama}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:3}}>📱 {o.noHp} · 📅 {o.tanggalKirim||"-"} · {o.pengiriman}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{(o.items||[]).slice(0,2).map((it,i)=><span key={i}>{i>0?", ":""}{itemLabel(it)} x{it.qty}</span>)}{(o.items||[]).length>2&&<span style={{color:B}}> +{o.items.length-2}</span>}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{textAlign:"right",marginRight:4}}>
                      <div style={{fontWeight:700,fontSize:14}}>{rp(o.total)}</div>
                      <div style={{marginTop:4}}><Badge status={o.status}/></div>
                    </div>
                    <button className="btn" style={{background:B,color:"#fff",fontSize:12,padding:"8px 14px",whiteSpace:"nowrap"}} onClick={()=>printInvoice(o)}>🧾 Generate</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {tab==="box"&&user.isMaster&&(
        <div>
          <BoxWarning/>

          {BOX_TYPES.map(bt=>{
            const total=boxTotal(bt);
            const isExpanded=boxAction?.box===bt;
            return(
              <div key={bt} className="card" style={{marginBottom:12,borderLeft:`4px solid ${B}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontWeight:700,fontSize:16}}>{bt}</span>
                  <span style={{fontSize:11,color:"#64748b"}}>Total: <strong style={{fontSize:16,color:B}}>{total}</strong> pcs</span>
                </div>

                {/* Sub-kategori grid */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
                  {BOX_CATS.map(cat=>{
                    const qty=boxInv[bt]?.[cat]||0;
                    const active=boxActive[bt]?.[cat]!==false;
                    const isLow=active&&qty<5;
                    return(
                      <div key={cat} style={{background:active?"#fff":"#f1f5f9",border:`1px solid ${isLow?"#fecaca":active?"#e2e8f0":"#e2e8f0"}`,borderRadius:8,padding:10,opacity:active?1:0.5,position:"relative"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                          <span style={{fontSize:12,fontWeight:600,color:active?"#374151":"#94a3b8"}}>{cat}</span>
                          <button onClick={()=>{
                            setBoxActive(p=>{const u=JSON.parse(JSON.stringify(p));if(!u[bt])u[bt]={};u[bt][cat]=!active;saveBox(boxInv,u,boxLogs);return u;});
                          }} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,padding:0}} title={active?"Nonaktifkan":"Aktifkan"}>
                            {active?"🟢":"⚪"}
                          </button>
                        </div>
                        <div style={{fontSize:22,fontWeight:900,color:isLow?"#dc2626":active?B:"#94a3b8",textAlign:"center",margin:"4px 0"}}>{qty}</div>
                        {isLow&&<div style={{fontSize:10,color:"#dc2626",textAlign:"center",fontWeight:600}}>Menipis!</div>}
                        {!active&&<div style={{fontSize:10,color:"#94a3b8",textAlign:"center"}}>Nonaktif</div>}
                      </div>
                    );
                  })}
                </div>

                {/* Tombol Add / Less */}
                <div className="row">
                  <button className="btn" style={{background:"#059669",color:"#fff",flex:1,padding:"6px 0",fontSize:13}} onClick={()=>{setBoxAction({type:"add",box:bt});setBoxAQty(1);setBoxACat("Box Biasa");setBoxAKet("");}}>+ Add</button>
                  <button className="btn" style={{background:"#dc2626",color:"#fff",flex:1,padding:"6px 0",fontSize:13}} onClick={()=>{setBoxAction({type:"less",box:bt});setBoxAQty(1);setBoxACat("Box Biasa");setBoxAKet("");}}>- Less</button>
                </div>

                {/* Form Add/Less */}
                {isExpanded&&(
                  <div style={{marginTop:10,padding:12,background:boxAction.type==="add"?"#f0fdf4":"#fff5f5",borderRadius:8,border:`1px solid ${boxAction.type==="add"?"#86efac":"#fecaca"}`}}>
                    <div style={{fontSize:13,fontWeight:700,color:boxAction.type==="add"?"#059669":"#dc2626",marginBottom:8}}>{boxAction.type==="add"?"+ Tambah Stok":"- Kurangi Stok"} — {bt}</div>
                    <div className="g2" style={{marginBottom:8}}>
                      <div>
                        <label className="lbl">Kategori Box</label>
                        <select value={boxACat} onChange={e=>setBoxACat(e.target.value)} className="inp">
                          {BOX_CATS.map(c=><option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div><label className="lbl">Jumlah</label><input type="number" min="1" value={boxAQty} onChange={e=>setBoxAQty(Number(e.target.value))} className="inp"/></div>
                    </div>
                    <div style={{marginBottom:8}}><label className="lbl">Keterangan</label><input value={boxAKet} onChange={e=>setBoxAKet(e.target.value)} placeholder="Keterangan (opsional)" className="inp"/></div>
                    <div className="row">
                      <button className="btn" style={{background:boxAction.type==="add"?"#059669":"#dc2626",color:"#fff",flex:1,fontSize:12,padding:"6px 0"}} onClick={async()=>{
                        const qty=Math.max(1,boxAQty);
                        const lg={id:Date.now(),boxType:bt,boxCat:boxACat,action:boxAction.type,qty,keterangan:boxAKet||"-",timestamp:fmtTs()};
                        setBoxInv(p=>{
                          const u=JSON.parse(JSON.stringify(p));
                          if(!u[bt])u[bt]={};
                          u[bt][boxACat]=boxAction.type==="add"?(u[bt][boxACat]||0)+qty:Math.max(0,(u[bt][boxACat]||0)-qty);
                          const nl=[lg,...boxLogs];
                          setBoxLogs(nl);
                          saveBox(u,boxActive,nl);
                          return u;
                        });
                        if(SB.ok())await SB.ins("box_logs",{box_type:lg.boxType,box_cat:lg.boxCat,action:lg.action,qty:lg.qty,keterangan:lg.keterangan,log_timestamp:lg.timestamp});
                        setBoxAction(null);
                      }}>Simpan</button>
                      <button className="btn" style={{background:"#f1f5f9",color:"#475569",flex:1,fontSize:12,padding:"6px 0",border:"1px solid #e2e8f0"}} onClick={()=>setBoxAction(null)}>Batal</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Log Perubahan Stok */}
          <div className="card">
            <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700}}>📋 Log Perubahan Stok</h3>
            {boxLogs.length===0?<div style={{textAlign:"center",padding:"30px 0",color:"#94a3b8"}}>Belum ada log.</div>:
            <div style={{maxHeight:340,overflowY:"auto"}}>
              <table>
                <thead><tr>{["Waktu","Box","Kategori","Aksi","Qty","Keterangan"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>{boxLogs.map((lg,i)=>(
                  <tr key={lg.id} style={{background:i%2===0?"#fff":"#f8fafc",borderBottom:"1px solid #f1f5f9"}}>
                    <td style={{fontSize:12,color:"#64748b",whiteSpace:"nowrap"}}>{lg.timestamp}</td>
                    <td style={{fontWeight:600}}>{lg.boxType}</td>
                    <td style={{fontSize:12,color:"#475569"}}>{lg.boxCat||"-"}</td>
                    <td><span style={{padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:700,background:lg.action==="add"?"#d1fae5":"#fee2e2",color:lg.action==="add"?"#059669":"#dc2626"}}>{lg.action==="add"?"+ ADD":"- LESS"}</span></td>
                    <td style={{fontWeight:700}}>{lg.qty}</td>
                    <td style={{color:"#64748b"}}>{lg.keterangan}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}
