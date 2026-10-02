// Qualitative examples from the SIMIT paper (Fig. 4 and Appendix N), precomputed.
// Generated from sections_v0/appendix_qualitative_results.tex; no inference happens on the page.
window.SIMIT_EXAMPLES = [
 {
  "id": "ok_vqa_val2014_492",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_492_query.webp",
  "q": "In what country would you find this hat?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "vietnam, china, japan",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_492_syn1.webp",
    "q": "How many wheels does the bicycle have?",
    "a": "Two"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_492_syn2.webp",
    "q": "What color is the hat the person is wearing?",
    "a": "Brown"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_492_real1.webp",
    "q": "What city is this?",
    "a": "beijing"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_492_real2.webp",
    "q": "From what continent does this meal look like it came from?",
    "a": "asia"
   }
  ],
  "icl": {
   "text": "Vietnam",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Vietnam",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "vietnam",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "asia",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "infovqa_val_449",
  "bench": "InfoVQA",
  "img": "static/img/samples/infovqa_val_449_query.webp",
  "q": "How many points are listed under when to wash your hands?",
  "instr": "Answer the question using a single word or phrase.",
  "gt": "6",
  "caption": false,
  "zs": {
   "text": "7",
   "ok": false,
   "metric": "ANLS",
   "score": "0.000"
  },
  "syn": [
   {
    "img": "static/img/samples/infovqa_val_449_syn1.webp",
    "q": "How many times does the infographic suggest washing hands?",
    "a": "6"
   },
   {
    "img": "static/img/samples/infovqa_val_449_syn2.webp",
    "q": "What is the purpose of step 8 in the handwashing process?",
    "a": "Rinse hands with water"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/infovqa_val_449_real1.webp",
    "q": "How many points are under the heading “Soft Skills“?",
    "a": "3"
   },
   {
    "img": "static/img/samples/infovqa_val_449_real2.webp",
    "q": "How many additional support for SMMEs have been announced?",
    "a": "6"
   }
  ],
  "icl": {
   "text": "6",
   "ok": true,
   "metric": "ANLS",
   "score": "1.000"
  },
  "ft": {
   "text": "6",
   "ok": true,
   "metric": "ANLS",
   "score": "1.000"
  },
  "rices": {
   "text": "6",
   "ok": true,
   "metric": "ANLS",
   "score": "1.000"
  },
  "tttnn": {
   "text": "6",
   "ok": true,
   "metric": "ANLS",
   "score": "1.000"
  }
 },
 {
  "id": "vizwiz_vqa_val_345",
  "bench": "VizWiz-VQA",
  "img": "static/img/samples/vizwiz_vqa_val_345_query.webp",
  "q": "What color is this cat?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "brown, tan, grey black, sable",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/vizwiz_vqa_val_345_syn1.webp",
    "q": "How many legs does the cat have?",
    "a": "Four"
   },
   {
    "img": "static/img/samples/vizwiz_vqa_val_345_syn2.webp",
    "q": "Is the cat sitting or lying down?",
    "a": "Sitting"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/vizwiz_vqa_val_345_real1.webp",
    "q": "What color is this shirt?",
    "a": "tan"
   },
   {
    "img": "static/img/samples/vizwiz_vqa_val_345_real2.webp",
    "q": "What color are my shoes?",
    "a": "brown"
   }
  ],
  "icl": {
   "text": "Brown.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Brown",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "brown",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "tan",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.30"
  }
 },
 {
  "id": "ok_vqa_val2014_151",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_151_query.webp",
  "q": "Where would he use this?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "outside",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_151_syn1.webp",
    "q": "How many people are in the image?",
    "a": "One person."
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_151_syn2.webp",
    "q": "What color is the kite?",
    "a": "Green."
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_151_real1.webp",
    "q": "Where are these kites?",
    "a": "sky"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_151_real2.webp",
    "q": "What does this man fly for fun?",
    "a": "kite"
   }
  ],
  "icl": {
   "text": "Outside.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Outside.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "sky",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "tttnn": {
   "text": "sky",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "ok_vqa_val2014_477",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_477_query.webp",
  "q": "What art is this?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "pottery",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_477_syn1.webp",
    "q": "How many vases are visible in the image?",
    "a": "Over 20"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_477_syn2.webp",
    "q": "What is the primary activity taking place in the image?",
    "a": "Pottery making"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_477_real1.webp",
    "q": "What is this vase made of?",
    "a": "glass"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_477_real2.webp",
    "q": "What material is the receptacle holding the flowers made from?",
    "a": "porcelain"
   }
  ],
  "icl": {
   "text": "Pottery",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Pottery",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "tttnn": {
   "text": "porcelain",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "refcoco_bbox_val_205",
  "bench": "RefCOCO",
  "img": "static/img/samples/refcoco_bbox_val_205_query.webp",
  "q": "Provide a short description for this region.",
  "instr": "",
  "gt": "woman holding clock in middle black dress, middle holding the clock, lady holding up clock",
  "caption": true,
  "zs": {
   "text": "A person is standing up.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.222"
  },
  "syn": [
   {
    "img": "static/img/samples/refcoco_bbox_val_205_syn1.webp",
    "q": "How many people are holding clocks?",
    "a": "One"
   },
   {
    "img": "static/img/samples/refcoco_bbox_val_205_syn2.webp",
    "q": "What is the dominant color of the clothing worn by the person in the center-left of the image?",
    "a": "Orange"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/refcoco_bbox_val_205_real1.webp",
    "q": "Please carefully observe the area circled in the image and come up with a caption for the area.",
    "a": "person on left"
   },
   {
    "img": "static/img/samples/refcoco_bbox_val_205_real2.webp",
    "q": "Please carefully observe the area circled in the image and come up with a caption for the area.",
    "a": "red head"
   }
  ],
  "icl": {
   "text": "A woman holding a clock.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.361"
  },
  "ft": {
   "text": "A woman holding a clock.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.361"
  },
  "rices": {
   "text": "A person is standing up",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.222"
  },
  "tttnn": {
   "text": "person",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.000"
  }
 },
 {
  "id": "coco2017_cap_val_387",
  "bench": "COCO Caption",
  "img": "static/img/samples/coco2017_cap_val_387_query.webp",
  "q": "Provide a one-sentence caption for the provided image.",
  "instr": "",
  "gt": "three little kids that have different ties on, A jumping boy wearing three different neck ties, Three boys jumping in the air while wearing ties., Three boys dressed in jeans and ties pose., The three boys are creating their own dance moves",
  "caption": true,
  "zs": {
   "text": "A young man wearing a shirt and tie.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.086"
  },
  "syn": [
   {
    "img": "static/img/samples/coco2017_cap_val_387_syn1.webp",
    "q": "How many people are wearing ties?",
    "a": "Three"
   },
   {
    "img": "static/img/samples/coco2017_cap_val_387_syn2.webp",
    "q": "What color is the shirt worn by the person in the middle?",
    "a": "White"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/coco2017_cap_val_387_real1.webp",
    "q": "Please carefully observe the image and come up with a caption for the image.",
    "a": "A man swings at a tennis ball on a tennis court."
   },
   {
    "img": "static/img/samples/coco2017_cap_val_387_real2.webp",
    "q": "Please carefully observe the image and come up with a caption for the image.",
    "a": "a close up of a person wearing a bow tie"
   }
  ],
  "icl": {
   "text": "Three people wearing ties and jeans posing for a picture.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.973"
  },
  "ft": {
   "text": "Three young men wearing ties and jeans posing for a picture.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.876"
  },
  "rices": {
   "text": "A man is shown in three different poses.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.465"
  },
  "tttnn": {
   "text": "A young man is shown in three different poses.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.443"
  }
 },
 {
  "id": "nocaps_val_226",
  "bench": "NoCaps",
  "img": "static/img/samples/nocaps_val_226_query.webp",
  "q": "Provide a one-sentence caption for the provided image.",
  "instr": "",
  "gt": "Two people sitting down beside their instruments and playing guitar , Two men playing the guitar with multiple music equipment on the ground., Two men play guitar surrounded by drums and speakers in front of some trailers., Two men sit, one on a chair and the other on the floor, while they each play a guitar, and they are surrounded buy drums and other band equipment partly loaded into trucks., two people sitting and playing instruments together by themselves, Two musicians sit outside their vehicle practicing on their guitars",
  "caption": true,
  "zs": {
   "text": "A man sits in front of an EVH amplifier.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.007"
  },
  "syn": [
   {
    "img": "static/img/samples/nocaps_val_226_syn1.webp",
    "q": "How many people are on stage?",
    "a": "Two"
   },
   {
    "img": "static/img/samples/nocaps_val_226_syn2.webp",
    "q": "What type of shoe does the guitarist wear?",
    "a": "Sneakers"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/nocaps_val_226_real1.webp",
    "q": "Describe the image.",
    "a": "A silver car parked on the side of a gravel road."
   },
   {
    "img": "static/img/samples/nocaps_val_226_real2.webp",
    "q": "Describe the image.",
    "a": "A smiling man in a red shirt and smiling woman with long black curly hair with a water bottle next to them."
   }
  ],
  "icl": {
   "text": "Two men sitting on the ground playing guitars.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.599"
  },
  "ft": {
   "text": "Two men playing guitars in front of a white amp that says EVH.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.366"
  },
  "rices": {
   "text": "Two men playing guitars and drums on a street.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.625"
  },
  "tttnn": {
   "text": "A man with a guitar and a sign that says EVK on it.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.233"
  }
 },
 {
  "id": "ok_vqa_val2014_8",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_8_query.webp",
  "q": "What kind of house is next to the stop sign?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "apartment, condo",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_8_syn1.webp",
    "q": "How many street signs are visible in the image?",
    "a": "Two"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_8_syn2.webp",
    "q": "What is the color of the stop sign in the image?",
    "a": "Red"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_8_real1.webp",
    "q": "What type of kitchen is this?",
    "a": "galley"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_8_real2.webp",
    "q": "What style of architecture is this building?",
    "a": "modern"
   }
  ],
  "icl": {
   "text": "apartment",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Apartment",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "apartment",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "galaxy",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "ok_vqa_val2014_381",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_381_query.webp",
  "q": "What is the light source?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "street light, streetlight",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_381_syn1.webp",
    "q": "How many people are sitting on the bench?",
    "a": "One"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_381_syn2.webp",
    "q": "How many people are sitting on the bench?",
    "a": "One"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_381_real1.webp",
    "q": "How is a parking lot illuminated at night?",
    "a": "lights"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_381_real2.webp",
    "q": "Where are the strands coming from?",
    "a": "ceiling"
   }
  ],
  "icl": {
   "text": "Street light",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Street light",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "street light",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "lights",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "vizwiz_vqa_val_47",
  "bench": "VizWiz-VQA",
  "img": "static/img/samples/vizwiz_vqa_val_47_query.webp",
  "q": "What is this item?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "angel, angel statuette",
  "caption": false,
  "zs": {
   "text": "Unanswerable.",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/vizwiz_vqa_val_47_syn1.webp",
    "q": "How many objects are visible in the image?",
    "a": "Three"
   },
   {
    "img": "static/img/samples/vizwiz_vqa_val_47_syn2.webp",
    "q": "What is the primary color of the angel’s wings?",
    "a": "White"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/vizwiz_vqa_val_47_real1.webp",
    "q": "What is this item?",
    "a": "plastic pig another on his back"
   },
   {
    "img": "static/img/samples/vizwiz_vqa_val_47_real2.webp",
    "q": "What is this?",
    "a": "teddy bear rose"
   }
  ],
  "icl": {
   "text": "Angel",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Angel.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "angel",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "angel cat",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "vizwiz_vqa_val_87",
  "bench": "VizWiz-VQA",
  "img": "static/img/samples/vizwiz_vqa_val_87_query.webp",
  "q": "What is this a picture of?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "dog in lace dress, dog",
  "caption": false,
  "zs": {
   "text": "Unanswerable.",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/vizwiz_vqa_val_87_syn1.webp",
    "q": "What color is the belly of the animal in the picture?",
    "a": "Pink"
   },
   {
    "img": "static/img/samples/vizwiz_vqa_val_87_syn2.webp",
    "q": "Is the animal in the picture a cat or a dog?",
    "a": "Dog"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/vizwiz_vqa_val_87_real1.webp",
    "q": "What kind of dog is this?",
    "a": "tan"
   },
   {
    "img": "static/img/samples/vizwiz_vqa_val_87_real2.webp",
    "q": "What is this?",
    "a": "yellow labrador on purple cushion"
   }
  ],
  "icl": {
   "text": "Dog",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Dog.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "dog",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "tan and white dog",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  }
 },
 {
  "id": "coco2017_cap_val_329",
  "bench": "COCO Caption",
  "img": "static/img/samples/coco2017_cap_val_329_query.webp",
  "q": "Provide a one-sentence caption for the provided image.",
  "instr": "",
  "gt": "A group of foot ball players standing on top of a football field., Players and a referee playing on a football field., a couple of football players in the air, Two football players reach for the ball at the same time., A receiver and a defender jump for the ball as a referee looks on during a football game",
  "caption": true,
  "zs": {
   "text": "A football player jumping up to catch a football.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.609"
  },
  "syn": [
   {
    "img": "static/img/samples/coco2017_cap_val_329_syn1.webp",
    "q": "How many players are in mid-air?",
    "a": "Two"
   },
   {
    "img": "static/img/samples/coco2017_cap_val_329_syn2.webp",
    "q": "What is the player wearing number 38 doing?",
    "a": "Refereeing"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/coco2017_cap_val_329_real1.webp",
    "q": "Please carefully observe the image and come up with a caption for the image.",
    "a": "A little league baseball player hits a ball."
   },
   {
    "img": "static/img/samples/coco2017_cap_val_329_real2.webp",
    "q": "Please carefully observe the image and come up with a caption for the image.",
    "a": "A group of women playing a game of soccer on field."
   }
  ],
  "icl": {
   "text": "A referee watching two players jump for a football.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.356"
  },
  "ft": {
   "text": "A group of football players on a field.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.798"
  },
  "rices": {
   "text": "A football player jumping in the air to catch a football.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.729"
  },
  "tttnn": {
   "text": "A group of men playing a game of football on field.",
   "ok": false,
   "metric": "CIDEr",
   "score": "1.151"
  }
 },
 {
  "id": "nocaps_val_45",
  "bench": "NoCaps",
  "img": "static/img/samples/nocaps_val_45_query.webp",
  "q": "Provide a one-sentence caption for the provided image.",
  "instr": "",
  "gt": "A happy man in a sailor outside has a pitcher of milk, A man in a white hat holding a glass of milk., A man in a white uniform and hat holding a glass of milk., A friendly man in a white unifom holds a glass of milk., A white man in a white suit holds up a glass of white liquid., Actor of a milk man, dressed in all whites and a hat, drinking a mug of milk",
  "caption": true,
  "zs": {
   "text": "A man in a white shirt with the word Oberweis on it.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.301"
  },
  "syn": [
   {
    "img": "static/img/samples/nocaps_val_45_syn1.webp",
    "q": "What is the person holding?",
    "a": "A glass mug filled with milk."
   },
   {
    "img": "static/img/samples/nocaps_val_45_syn2.webp",
    "q": "What is on the person’s head?",
    "a": "A white hat with a black band."
   }
  ],
  "real": [
   {
    "img": "static/img/samples/nocaps_val_45_real1.webp",
    "q": "Describe the image.",
    "a": "The man has a drink and using his human face for his emotions, and the person beside of him is smiling."
   },
   {
    "img": "static/img/samples/nocaps_val_45_real2.webp",
    "q": "Describe the image.",
    "a": "A man with a mustache wearing a white hat."
   }
  ],
  "icl": {
   "text": "A man wearing a white hat and holding a glass mug filled with milk.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.565"
  },
  "ft": {
   "text": "A man in a white shirt with Oberweis Dairy on the pocket is holding a glass mug of milk.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.941"
  },
  "rices": {
   "text": "A man with a mustache holding a glass of milk.",
   "ok": true,
   "metric": "CIDEr",
   "score": "2.251"
  },
  "tttnn": {
   "text": "A man in a white shirt with “OBERWEIS DAIRY” on it is holding a glass of milk.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.698"
  }
 },
 {
  "id": "refcoco_bbox_val_211",
  "bench": "RefCOCO",
  "img": "static/img/samples/refcoco_bbox_val_211_query.webp",
  "q": "Provide a short description for this region.",
  "instr": "",
  "gt": "left most red bear standing, left full bear, left most creature",
  "caption": true,
  "zs": {
   "text": "Leftest one.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.000"
  },
  "syn": [
   {
    "img": "static/img/samples/refcoco_bbox_val_211_syn1.webp",
    "q": "What is the dominant color of the objects in the image?",
    "a": "Red"
   },
   {
    "img": "static/img/samples/refcoco_bbox_val_211_syn2.webp",
    "q": "Are there any plants visible in the background?",
    "a": "Yes"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/refcoco_bbox_val_211_real1.webp",
    "q": "Please carefully observe the area circled in the image and come up with a caption for the area.",
    "a": "larger bear, upside down center leftish"
   },
   {
    "img": "static/img/samples/refcoco_bbox_val_211_real2.webp",
    "q": "Please carefully observe the area circled in the image and come up with a caption for the area.",
    "a": "plaid bear on left"
   }
  ],
  "icl": {
   "text": "A red teddy bear.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.625"
  },
  "ft": {
   "text": "Red bear on the left.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.289"
  },
  "rices": {
   "text": "Red bear on the left.",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.289"
  },
  "tttnn": {
   "text": "left bear",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.991"
  }
 },
 {
  "id": "refcoco_bbox_val_90",
  "bench": "RefCOCO",
  "img": "static/img/samples/refcoco_bbox_val_90_query.webp",
  "q": "Provide a short description for this region.",
  "instr": "",
  "gt": "woman in striped shirt, Girl with long hair in striped shirt, girl with long ponytail and striped shirt",
  "caption": true,
  "zs": {
   "text": "A person is standing up.",
   "ok": false,
   "metric": "CIDEr",
   "score": "0.000"
  },
  "syn": [
   {
    "img": "static/img/samples/refcoco_bbox_val_90_syn1.webp",
    "q": "How many people are actively participating in the activity?",
    "a": "Two"
   },
   {
    "img": "static/img/samples/refcoco_bbox_val_90_syn2.webp",
    "q": "What type of activity is taking place in the image?",
    "a": "Virtual sports gaming"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/refcoco_bbox_val_90_real1.webp",
    "q": "Please carefully observe the area circled in the image and come up with a caption for the area.",
    "a": "lady to right green shirt"
   },
   {
    "img": "static/img/samples/refcoco_bbox_val_90_real2.webp",
    "q": "Please carefully observe the area circled in the image and come up with a caption for the area.",
    "a": "man holding tennis racket"
   }
  ],
  "icl": {
   "text": "A woman with a long ponytail.",
   "ok": true,
   "metric": "CIDEr",
   "score": "0.938"
  },
  "ft": {
   "text": "Girl with long ponytail.",
   "ok": true,
   "metric": "CIDEr",
   "score": "2.837"
  },
  "rices": {
   "text": "Girl in striped shirt.",
   "ok": true,
   "metric": "CIDEr",
   "score": "3.458"
  },
  "tttnn": {
   "text": "lady with long ponytail",
   "ok": true,
   "metric": "CIDEr",
   "score": "1.618"
  }
 },
 {
  "id": "ok_vqa_val2014_115",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_115_query.webp",
  "q": "The man is opening what?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "umbrella",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_115_syn1.webp",
    "q": "What is the man holding?",
    "a": "Umbrella"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_115_syn2.webp",
    "q": "What season is it?",
    "a": "Fall/Winter"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_115_real1.webp",
    "q": "What is the name of the device that is protecting people from the rain in this picture?",
    "a": "umbrella"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_115_real2.webp",
    "q": "What is this on top of?",
    "a": "coffee shop"
   }
  ],
  "icl": {
   "text": "Umbrella",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Umbrella",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "Umbrella",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "umbrella",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  }
 },
 {
  "id": "ok_vqa_val2014_210",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_210_query.webp",
  "q": "What type of flower is this?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "rose",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_210_syn1.webp",
    "q": "How many flowers are in the vase?",
    "a": "One"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_210_syn2.webp",
    "q": "What color is the pumpkin-shaped container holding the plant?",
    "a": "Orange"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_210_real1.webp",
    "q": "What type of flower is this?",
    "a": "rose"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_210_real2.webp",
    "q": "What kind of flowers are these?",
    "a": "tulip"
   }
  ],
  "icl": {
   "text": "Rose",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Rose",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "rose",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "rose",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  }
 },
 {
  "id": "ok_vqa_val2014_253",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_253_query.webp",
  "q": "What time period is the action pictured here based off of?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "medieval, 1400’s",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_253_syn1.webp",
    "q": "How many people are holding shields?",
    "a": "Three"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_253_syn2.webp",
    "q": "What is the person riding?",
    "a": "Horse"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_253_real1.webp",
    "q": "What time period are these people from?",
    "a": "medieval"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_253_real2.webp",
    "q": "What kind of event is this?",
    "a": "jousting"
   }
  ],
  "icl": {
   "text": "Medieval.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Medieval",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "medieval",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "medieval",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  }
 },
 {
  "id": "ok_vqa_val2014_272",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_272_query.webp",
  "q": "What toy is this?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "teddy bear",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_272_syn1.webp",
    "q": "How many teddy bears are on the bench?",
    "a": "Three"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_272_syn2.webp",
    "q": "What color is the flower bouquet?",
    "a": "Pink"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_272_real1.webp",
    "q": "What kind of stuffed toy is in the picture?",
    "a": "bear"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_272_real2.webp",
    "q": "What animal is this?",
    "a": "bear"
   }
  ],
  "icl": {
   "text": "Teddy bear",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Teddy bear",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "teddy bear",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "bear",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.60"
  }
 },
 {
  "id": "ok_vqa_val2014_291",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_291_query.webp",
  "q": "Can you guess the family or breed to which the dog belongs to?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "boston terrier, french bulldog",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_291_syn1.webp",
    "q": "How many legs does the dog have?",
    "a": "Four"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_291_syn2.webp",
    "q": "What kind of breed is the dog?",
    "a": "French Bulldog"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_291_real1.webp",
    "q": "Name the family or bread to which this dog belongs to?",
    "a": "boston terrier"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_291_real2.webp",
    "q": "What breed of dog is seen in this picture?",
    "a": "bulldog"
   }
  ],
  "icl": {
   "text": "French Bulldog",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "French bulldog",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "french bulldog",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "boston terrier",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  }
 },
 {
  "id": "ok_vqa_val2014_22",
  "bench": "OK-VQA",
  "img": "static/img/samples/ok_vqa_val2014_22_query.webp",
  "q": "What kind of lens distorts the picture in this way?",
  "instr": "When the provided information is insufficient, respond with ‘Unanswerable’. Answer the question using a single word or phrase.",
  "gt": "fisheye, fish eye lens",
  "caption": false,
  "zs": {
   "text": "Unanswerable",
   "ok": false,
   "metric": "VQA acc.",
   "score": "0.00"
  },
  "syn": [
   {
    "img": "static/img/samples/ok_vqa_val2014_22_syn1.webp",
    "q": "How many people are in the image?",
    "a": "One"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_22_syn2.webp",
    "q": "What color is the vehicle in the image?",
    "a": "Yellow"
   }
  ],
  "real": [
   {
    "img": "static/img/samples/ok_vqa_val2014_22_real1.webp",
    "q": "What type of lens is used for this picture?",
    "a": "fisheye"
   },
   {
    "img": "static/img/samples/ok_vqa_val2014_22_real2.webp",
    "q": "What is the term for the effect used in this photo?",
    "a": "fisheye"
   }
  ],
  "icl": {
   "text": "Fisheye.",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "ft": {
   "text": "Fisheye",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "rices": {
   "text": "fisheye",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  },
  "tttnn": {
   "text": "fisheye",
   "ok": true,
   "metric": "VQA acc.",
   "score": "1.00"
  }
 }
];
