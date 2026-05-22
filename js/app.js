/**
 * Cooking with Frozen - Main Application Controller
 * 
 * Manages:
 * 1. Single Page Application (SPA) routing with smooth liquid glass transitions.
 * 2. Left side Pizza Slice hamburger navigation side drawer.
 * 3. Local state-wise Food Recommendations Engine focusing on Raipur, Chhattisgarh.
 * 4. Interactive Canvas background with organic drifting liquid blobs reacting to cursor/scroll.
 * 5. Recipe modal showcase system.
 * 6. Cuisine interactive filtering and detail drawer.
 * 7. local-storage based Feedback Board and rating system.
 * 8. History timeline scroll reveals.
 */

// Global Recipe Database matching the screenshot + Vegan/Vegetarian varieties
const RECIPE_DATA = {
    pizza: {
        title: "Liquid-Glass Garden Neapolitan Pizza",
        tagline: "Slow-fermented dough, heirloom vine tomatoes, fresh vegan mozzarella, & basil pearls.",
        prep: "25 mins",
        cook: "10 mins",
        difficulty: "Medium",
        servings: "2-3",
        ingredients: [
            "300g Italian Type 00 Flour",
            "200ml Lukewarm Water",
            "4g Active Dry Yeast",
            "10g Sea Salt",
            "150g San Marzano Tomato Puree",
            "120g Artisan Vegan Mozzarella (Cashew-based)",
            "Heirloom Cherry Tomatoes (halved)",
            "Fresh Organic Sweet Basil Leaves",
            "Extra Virgin Olive Oil (cold pressed)"
        ],
        steps: [
            "Dissolve yeast in warm water and let stand for 5 minutes until frothy.",
            "Mix flour and salt, then slowly add yeast water to form a soft dough. Knead for 10 minutes until elastic.",
            "Place in a oiled glass bowl, cover, and let ferment for 18-24 hours for ultimate bubble structure.",
            "Stretch dough by hand into a 12-inch circle, leaving a puffy crust border (Cornicione).",
            "Spread tomato puree smoothly, scatter cashew mozzarella and heirloom tomato slices.",
            "Bake in a preheated pizza oven at 450°C (850°F) for 2 minutes, or domestic oven at max temp on a pizza stone for 8-10 minutes.",
            "Finish with fresh sweet basil, a drizzle of olive oil, and serve hot."
        ],
        image: "🍕"
    },
    parfait: {
        title: "Heirloom Fruit & Coconut Custard Parfait",
        tagline: "Velvety coconut cream custard layered with local organic berries, mango gelee, & crisp oat crumble.",
        prep: "15 mins",
        cook: "5 mins",
        difficulty: "Easy",
        servings: "2",
        ingredients: [
            "400ml Organic Coconut Cream",
            "2 tbsp Pure Maple Syrup",
            "1 tsp Organic Vanilla Bean Paste",
            "1 cup Mixed Fresh Berries (Raspberries, Blueberries, Blackberries)",
            "1 Ripe Organic Alphonso Mango (pureed)",
            "1/2 cup Gluten-Free Rolled Oats",
            "2 tbsp Pumpkin Seeds (roasted)",
            "1 tbsp Coconut Flakes (toasted)"
        ],
        steps: [
            "Chill coconut cream overnight. Scoop out the thick coconut solids and whip with vanilla paste and maple syrup until fluffy.",
            "In a separate small pan, lightly toast oats, pumpkin seeds, and coconut flakes with a touch of maple syrup until crisp and golden brown.",
            "Puree the fresh ripe mango until velvety smooth.",
            "In elegant rounded serving glasses, layer whipped coconut cream at the bottom.",
            "Add a layer of mango puree, followed by a handful of fresh mixed berries.",
            "Sprinkle toasted oat and seed crumble to create a crispy texture division.",
            "Repeat layering to the top. Chill for 1 hour before serving. Garnish with a mint leaf."
        ],
        image: "🍨"
    },
    noodles: {
        title: "Spiced Wok-Tossed Handmade Szechuan Noodles",
        tagline: "Hand-pulled ribbon noodles tossed in spicy toasted sesame oil, ginger, gai lan, & roasted peanuts.",
        prep: "20 mins",
        cook: "10 mins",
        difficulty: "Medium",
        servings: "2",
        ingredients: [
            "200g Fresh Wheat Ribbon Noodles",
            "2 tbsp Dark Soy Sauce",
            "1 tbsp Black Rice Vinegar (Chinkiang)",
            "2 tbsp Toasted Sesame Paste",
            "1.5 tbsp Szechuan Chili Oil (with flakes)",
            "3 cloves Garlic (minced)",
            "1 inch Fresh Ginger (grated)",
            "4 stalks Gai Lan (Chinese Broccoli) or Baby Bok Choy",
            "2 tbsp Crushed Roasted Peanuts",
            "Chopped Scallions and Coriander for garnish"
        ],
        steps: [
            "Cook fresh wheat ribbon noodles in boiling salted water for 4-5 minutes until al dente. Drain, tossing with a splash of sesame oil.",
            "Whisk soy sauce, black vinegar, sesame paste, chili oil, minced garlic, and grated ginger in a small glass bowl to form the Szechuan sauce base.",
            "Heat a wok on high until smoking, add 1 tbsp peanut oil, and stir-fry green vegetables for 2 minutes until tender-crisp.",
            "Reduce heat to medium, toss in the cooked ribbon noodles, and pour the spicy sauce over them.",
            "Toss vigorously for 1-2 minutes until every noodle strand is glazed in the fragrant chili sauce.",
            "Plate into deep rounded ceramic bowls.",
            "Garnish generously with crushed roasted peanuts, sliced scallions, and fresh coriander."
        ],
        image: "🍜"
    },
    burger: {
        title: "Artisanal Smoked Jackfruit & Beetroot Craft Burger",
        tagline: "Slow-braised jackfruit patty, avocado smash, pickled red onion, & spicy vegan garlic aioli.",
        prep: "30 mins",
        cook: "15 mins",
        difficulty: "Hard",
        servings: "4",
        ingredients: [
            "1 can Young Green Jackfruit (in brine, drained)",
            "1 small Organic Beetroot (grated, for color & moisture)",
            "1/2 cup Cooked Brown Lentils",
            "1/2 cup Gluten-Free Breadcrumbs",
            "1 tbsp Smoked Paprika",
            "1 tsp Ground Cumin & Garlic Powder",
            "4 Artisanal Vegan Brioche Buns (toasted)",
            "1 ripe Avocado (smashed with lime juice)",
            "Pickled Red Onion rings",
            "Vegan Garlic Mayo (aquafaba based)"
        ],
        steps: [
            "Rinse and shred jackfruit, discarding any hard core parts. Saute in a skillet with smoked paprika, cumin, garlic, and a splash of vegetable stock for 10 minutes until tender.",
            "In a food processor, pulse brown lentils and sauteed jackfruit. Transfer to a bowl and fold in grated beetroot, breadcrumbs, salt, and pepper.",
            "Shape the mixture into 4 thick burger patties. Chill in the fridge for 15 minutes to firm up.",
            "Heat a grill pan or cast iron skillet with oil. Sear the burger patties for 5-6 minutes on each side until a deep charred crust forms.",
            "Toast the brioche buns lightly on the cut side.",
            "Spread garlic aioli on the bottom bun. Place the jackfruit beetroot patty, followed by avocado smash and pickled red onion.",
            "Top with the brioche bun cover and serve with sweet potato wedges."
        ],
        image: "🍔"
    }
};

// Global Cuisine List for the Explorer Page
const GLOBAL_CUISINES = [
    {
        name: "Italian Delicacies",
        region: "Europe",
        dish: "Tuscan White Bean Ribollita",
        desc: "A rich, slow-simmered Tuscan vegetable stew with cannellini beans, cavolo nero, sweet garlic, extra virgin olive oil, and rustic sourdough glass-toast.",
        emoji: "🥬",
        spicy: "Mild",
        time: "45 mins"
    },
    {
        name: "Indian Feast",
        region: "Asia",
        dish: "Mughlai Cashew & Tofu Korma",
        desc: "A velvety, rich royal curry prepared with cashew paste, cardamom, saffron-infused coconut cream, grilled organic tofu cubes, and aromatic basmati rice.",
        emoji: "🍛",
        spicy: "Hot",
        time: "35 mins"
    },
    {
        name: "Mexican Fiesta",
        region: "Americas",
        dish: "Oaxacan Black Bean & Sweet Potato Enchiladas",
        desc: "Soft corn tortillas stuffed with roasted sweet potato, black beans, topped with traditional 24-ingredient dark chocolate Mole Negro and pumpkin seeds.",
        emoji: "🌮",
        spicy: "Medium",
        time: "40 mins"
    },
    {
        name: "Japanese Simplicity",
        region: "Asia",
        dish: "Kyoto Forest Mushroom Udon",
        desc: "Handmade thick udon noodles served in a piping hot, crystal-clear shiitake and kombu dashi broth, topped with grilled maitake and enoki mushrooms, scallions, and shichimi togarashi.",
        emoji: "🍲",
        spicy: "Mild",
        time: "25 mins"
    },
    {
        name: "Middle Eastern Flavors",
        region: "Middle-East",
        dish: "Beirut Beetroot Hummus & Falafel Plate",
        desc: "Crispy herb-packed chickpea falafel served over vibrant roasted beetroot hummus, fresh mint salad, pickled turnips, and warm fluffy pita breads.",
        emoji: "🥙",
        spicy: "Mild",
        time: "30 mins"
    },
    {
        name: "African Heritage",
        region: "Africa",
        dish: "Spicy Red Lentil Misir Wot",
        desc: "Slow-cooked split red lentils simmered in warm, fragrant Berbere spice mix, garlic, ginger, served atop fluffy, sourdough Injera flatbread.",
        emoji: "🫓",
        spicy: "Very Hot",
        time: "50 mins"
    }
];

// Local Food Guide Database focusing on Raipur, Chhattisgarh and neighboring cities
const LOCAL_GUIDE_DATA = {
    raipur: {
        cityName: "Raipur, Chhattisgarh",
        stateName: "Chhattisgarh (Central India)",
        description: "The land of organic rice varieties, traditional leaf-steamed dumplings, and unique roasted grain snacks. Known globally as the 'Rice Bowl of India', Chhattisgarh features incredibly healthy, low-oil, steamed vegetarian staples prepared with locally grown herbs.",
        dishes: [
            {
                name: "Chhattisgarhi Fara (Phara)",
                type: "Steamed Rice Dumplings",
                desc: "Delicious steamed rolls crafted with freshly cooked rice and rice flour, seasoned beautifully with mustard seeds, sesame seeds, green chilies, and fresh curry leaves. Crisp on the outside, light and soft on the inside.",
                emoji: "🥢",
                ingredients: ["Cooked Rice", "Rice Flour", "Mustard Seeds", "Sesame Seeds", "Curry Leaves", "Green Chilies"],
                bestWith: "Spicy Roasted Coriander-Garlic Chutney"
            },
            {
                name: "Chhattisgarhi Chila",
                type: "Savory Rice Crepe",
                desc: "A thin, crispy savory crepe made from slow-fermented rice batter, fried on traditional iron griddles with minimal oil. A staple breakfast delicacy across households.",
                emoji: "🥞",
                ingredients: ["Rice Batter", "Water", "Salt", "Coriander Leaves", "Green Chili paste"],
                bestWith: "Native Roast Tomato-Garlic Chutney"
            },
            {
                name: "Bafauri",
                type: "High-Protein Steamed Dumplings",
                desc: "A healthy, guilt-free steamed snack prepared with seasoned chana dal (split Bengal gram) paste, chopped onions, coriander, ginger, and green chilies. A superb low-oil protein powerhouse.",
                emoji: "🟡",
                ingredients: ["Split Bengal Gram (Chana Dal)", "Ginger-Garlic Paste", "Onions", "Coriander Leaves", "Red Chili Flakes"],
                bestWith: "Tangy Tamarind Chutney"
            },
            {
                name: "Bara",
                type: "Spiced Lentil Fritters",
                desc: "A traditional light-fried donut-shaped fritter made of ground skinless urad dal (black gram), blended with chopped curry leaves, ginger, and green chilies. Typically prepared during native festivals.",
                emoji: "🍩",
                ingredients: ["Black Gram (Urad Dal)", "Ginger", "Curry Leaves", "Onions", "Green Chilies"],
                bestWith: "Spiced Curd (Dahi) or Mint Dipping Sauce"
            }
        ],
        locations: [
            {
                name: "Gadh Kalewa",
                tag: "Legendary Heritage Food Court",
                address: "Mahant Ghasidas Memorial Museum Campus, Civil Lines, Raipur",
                highlights: "An absolute must-visit cultural open-air heritage dining spot run by the Chhattisgarh Tourism Board. Traditional village setting where local women cook authentic native Chila, Fara, Bara, and Bafauri freshly on clay ovens. Highly authentic, hygienic, and extremely affordable.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Telibandha Marine Drive (Food Street)",
                tag: "Modern Street Food Spot",
                address: "Telibandha Lake Front, Great Eastern Road, Raipur",
                highlights: "Vibrant lakeside food street popular at sunset. Offers a blend of modern plant-based fusion dishes, local roll variants, custom chaats, spicy golgappas, and mocktail bars.",
                rating: "⭐⭐⭐⭐"
            },
            {
                name: "Chavela Restaurant",
                tag: "Traditional Thali Spot",
                address: "Shankar Nagar Main Road, Raipur",
                highlights: "Offers traditional multi-course Chhattisgarhi Thali showcasing native grain curries, steamed rice bread varieties, local saag, and traditional sweet sweets.",
                rating: "⭐⭐⭐⭐"
            }
        ]
    },
    delhi: {
        cityName: "Delhi (NCR)",
        stateName: "Delhi (North India)",
        description: "The street food capital of India. A melting pot of historical Mughal banquets, rich Punjabi butter-simmered gravies, and legendary roadside chaat carts. Delhi's food culture is loud, spicy, and deeply indulgent.",
        dishes: [
            {
                name: "Delhi Chole Bhature",
                type: "Spicy Chickpeas & Fluffy Bread",
                desc: "Spicy, slow-cooked dark chickpeas simmered in amchur (dried mango) and pomegranate spices, served with piping hot, giant leavened fried bread (bhatura) stuffed with paneer.",
                emoji: "🍛",
                ingredients: ["Chickpeas", "Pomegranate Seeds", "Amchur Powder", "Refined Flour (Maida)", "Desi Ghee"],
                bestWith: "Sweet Lassi & Spicy Pickled Carrots"
            },
            {
                name: "Aloo Tikki Chaat",
                type: "Crisp Stuffed Potato Patties",
                desc: "Shallow-fried crispy potato patties stuffed with spiced split peas, topped with sweet red tamarind nectar, cool whipped yogurt, fresh mint-coriander paste, and pomegranate pearls.",
                emoji: "🍪",
                ingredients: ["Potatoes", "Split Peas", "Sweet Curd", "Tamarind Chutney", "Mint Paste"],
                bestWith: "Crispy Sev & Ginger Juliennes"
            },
            {
                name: "Fruit Kulle Chaat",
                type: "Hollowed Spiced Fruit Bowls",
                desc: "Hollowed-out fresh seasonal fruits (melons, apples, cucumbers) stuffed with boiled black chickpeas, sweet pomegranate seeds, tangy lemon juice, and a heavy sprinkle of black salt and cumin.",
                emoji: "🍉",
                ingredients: ["Watermelon", "Cucumber", "Black Chickpeas", "Pomegranate", "Lemon Juice"],
                bestWith: "Spicy Kala Namak & Cumin Blend"
            }
        ],
        locations: [
            {
                name: "Sitaram Diwan Chand",
                tag: "Legendary Breakfast Landmark",
                address: "Chunar Wali Gali, Paharganj, New Delhi",
                highlights: "Globally famous for serving the most delicious, fluffy paneer-stuffed Chole Bhature in Delhi. A century-old breakfast routine for thousands of foodies.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Paranthe Wali Gali",
                tag: "Historic Heritage Street",
                address: "Chandni Chowk, Old Delhi",
                highlights: "A historic narrow lane dating back to the 1870s. Famous for traditional hot deep-fried flatbreads stuffed with green peas, mint, banana, and cashews.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Natraj Dahi Bhalla Corner",
                tag: "Classic Chaat Legend",
                address: "Main Road Mall, Chandni Chowk, Old Delhi",
                highlights: "Serving Delhi's softest lentil dumplings (bhallas) in thick sweet yogurt since 1940. The queue spans down the street every single afternoon.",
                rating: "⭐⭐⭐⭐⭐"
            }
        ]
    },
    lucknow: {
        cityName: "Lucknow, Uttar Pradesh",
        stateName: "Uttar Pradesh (The City of Nawabs)",
        description: "The birthplace of royal Awadhi dining, slow-cooked dum-pukht stews, and delicate cardamom-scented sweets. Lucknawi cuisine represents Nawabi elegance, where spices are complex yet incredibly smooth and fragrant.",
        dishes: [
            {
                name: "Royal Basket Chaat (Tokri Chaat)",
                type: "Grated Potato Basket Delight",
                desc: "An edible basket woven out of crispy grated potatoes, stuffed to the brim with boiled chickpeas, spiced potatoes, cool sweet curd, red tamarind paste, spicy mint water, and fresh coriander.",
                emoji: "🧺",
                ingredients: ["Potatoes", "Chickpeas", "Sweet Curd", "Tamarind", "Mint water"],
                bestWith: "Fresh pomegranate seeds and sev"
            },
            {
                name: "Veg Shami Kabab",
                type: "Melt-In-The-Mouth Patties",
                desc: "Delicate, pan-seared patties crafted with slow-simmered black lentils, raw banana, raw papaya, and infused with royal cardamom, cloves, and mint. Unbelievably soft texture.",
                emoji: "🧆",
                ingredients: ["Black Lentils", "Raw Banana", "Raw Papaya", "Aromatic Spices", "Fresh Mint"],
                bestWith: "Thin Rumali Roti & Mint Coriander Dip"
            },
            {
                name: "Lucknawi Veg Biryani",
                type: "Fragrant Saffron Dum Pulao",
                desc: "A luxurious basmati rice dish layered with garden vegetables, slow-steamed (dum) with saffron-infused milk, rose water, screwpine nectar (kewra), and toasted dry fruits.",
                emoji: "🍛",
                ingredients: ["Basmati Rice", "Saffron", "Kewra Nectar", "Toasted Cashews", "French Beans"],
                bestWith: "Cool Cucumber Burani Raita"
            }
        ],
        locations: [
            {
                name: "Royal Cafe Hazratganj",
                tag: "Birthplace of Basket Chaat",
                address: "Hazratganj Main Road, Lucknow",
                highlights: "World-famous open cafe where master chefs put on a theatrical show preparing the legendary multi-layered Basket Chaat. A sweet, spicy, and visual feast.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Tunday Kababi",
                tag: "Legacy Awadhi Kabab Shop",
                address: "Naaz Cinema Road, Aminabad, Lucknow",
                highlights: "While famous for meat, their authentic vegetarian minced lentil shami kababs, cooked with a secret 160-spice Nawabi family blend, are exceptionally rich.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Ram Asrey",
                tag: "Heritage Sweet House",
                address: "Chowk Crossing, Old City, Lucknow",
                highlights: "Over a century old. Famous globally for inventing the delicate 'Malai Gilori'—a thin sheet of milk cream wrapped around sweet nuts and cardamon.",
                rating: "⭐⭐⭐⭐⭐"
            }
        ]
    },
    banaras: {
        cityName: "Banaras (Varanasi)",
        stateName: "Varanasi (The Spiritual Heart)",
        description: "The spiritual capital of India. Food here is cooked with pure devotional fervor, heavily seasoned in ginger and local green chilies. Varanasi features legendary street chaats and manual hand-churned lassis served in earthen clay pots.",
        dishes: [
            {
                name: "Banarasi Tamatar Chaat",
                type: "Spiced Mashed Tomato Stew",
                desc: "Varanasi's absolute signature street food. Boiled tomatoes, potatoes, and peas mashed together, seasoned in red chilies, roasted cumin, and drizzled in pure ghee-sugar syrup. Served hot in clay kulhads.",
                emoji: "🍅",
                ingredients: ["Tomatoes", "Potatoes", "Ghee", "Sugar Syrup", "Roasted Cumin"],
                bestWith: "Crispy Namak Para (Wheat Crisps)"
            },
            {
                name: "Kashi Lassi",
                type: "Ultra-Thick Hand Churned Yogurt",
                desc: "Sweet curd hand-whipped to a velvety thickness, poured in heavy clay kulhads, and topped with thick malai (clotted cream), saffron strands, and crushed pistachios.",
                emoji: "🥛",
                ingredients: ["Curd", "Malai Cream", "Saffron", "Rose Water", "Pistachios"],
                bestWith: "Fresh chopped mango or banana slices"
            },
            {
                name: "Baati Chokha",
                type: "Charcoal Baked Wheat Balls",
                desc: "Rustic, charcoal-baked whole wheat balls stuffed with spiced roasted gram flour (sattu), served with roasted mashed brinjals, potatoes, garlic, and red chilies.",
                emoji: "🫓",
                ingredients: ["Whole Wheat Flour", "Sattu (Gram Flour)", "Brinjals", "Garlic", "Mustard Oil"],
                bestWith: "A dip in melted pure desi ghee"
            }
        ],
        locations: [
            {
                name: "Kashi Chat Bhandar",
                tag: "World Famous Chaat Hub",
                address: "Godowlia Crossing, Varanasi",
                highlights: "The ultimate culinary landmark of Varanasi. Constantly crowded, serving the absolute best Tamatar Chaat, Palak Patta Chaat, and sweet Gulab Jamuns in town.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Blue Lassi Shop",
                tag: "Legacy Lassi Landmark",
                address: "Near Manikarnika Ghat, Varanasi",
                highlights: "A tiny, blue-painted 80-year-old shop. Famous for serving over 50 varieties of hand-churned fruit and saffron lassis in earthenware clay pots.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Deena Chat Bhandar",
                tag: "Traditional Chaat Parlor",
                address: "Luxa Road, Varanasi",
                highlights: "Another vintage spot serving spectacular dahi bhallas, spicy chickpea aloo tikkis, and Varanasi's traditional hot ginger-infused potato stews.",
                rating: "⭐⭐⭐⭐"
            }
        ]
    },
    prayagraj: {
        cityName: "Prayagraj (Allahabad)",
        stateName: "Prayagraj (The Confluence Hub)",
        description: "The land of the sacred Triveni Sangam (confluence of three holy rivers). Prayagraj's food represents traditional Hindu temple culinary values—rich ghee breakfast kachoris, simple spiced pumpkin curries, and sweet roasted milk solids.",
        dishes: [
            {
                name: "Netram Kachori Sabzi",
                type: "Ghee Fried Lentil Kachoris",
                desc: "Thick whole wheat kachoris stuffed with spiced urad dal (black lentils), fried freshly in pure desi ghee, and served with a spicy, oil-free potato-pumpkin (kaddu) curry.",
                emoji: "🍘",
                ingredients: ["Whole Wheat Flour", "Black Lentils", "Pure Desi Ghee", "Pumpkin", "Potatoes"],
                bestWith: "Tangy Red Chili Pickles"
            },
            {
                name: "Sangam Dehati Peda",
                type: "Caramelized Roasted Milk Fudge",
                desc: "Rich pedas crafted by slow-roasting milk solids (khoya) until deeply caramelized, rolled in raw organic sugar and cardamon. Incredibly fudge-like and buttery.",
                emoji: "🍬",
                ingredients: ["Milk Solids (Khoya)", "Cardamom", "Raw Sugar", "Desi Ghee"],
                bestWith: "A glass of hot saffron milk"
            },
            {
                name: "Red Allahabad Guava Chaat",
                type: "Sweet Red Guava Fruit Chaat",
                desc: "Prayagraj is famous for its sweet red-fleshed guavas. Thick, juicy chunks tossed in roasted cumin, black salt, black pepper, and drizzled in fresh mint leaf chutney.",
                emoji: "🍏",
                ingredients: ["Red Guavas", "Kala Namak", "Roasted Cumin", "Mint Chutney", "Lime Juice"],
                bestWith: "Sweet and sour tamarind paste"
            }
        ],
        locations: [
            {
                name: "Netram Mulchand Katra",
                tag: "150-Year Heritage Legend",
                address: "Katra Main Road, Prayagraj",
                highlights: "The ultimate breakfast institution. Locals queue up before dawn for hot, ghee-fried kachoris cooked in enormous iron vats since the British era.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Loknath Food Street",
                tag: "Vintage Street Food Alley",
                address: "Loknath Lane, Chowk, Prayagraj",
                highlights: "A historic narrow food street that comes alive at night. Renowned for rich almond milkshakes, dehati pedas, and spicy roasted chickpea mixtures.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Hari Ram & Sons",
                tag: "Legacy Namkeen Landmark",
                address: "Loknath Chowk, Prayagraj",
                highlights: "Over 120 years old, famous for crisp, oil-free potato mixtures and samosas cooked in pure wood fire stoves.",
                rating: "⭐⭐⭐⭐"
            }
        ]
    },
    mumbai: {
        cityName: "Mumbai, Maharashtra",
        stateName: "Maharashtra (Western India)",
        description: "The capital of street food, legendary savory buns, and coastal coconut spice mixes. Mumbai street culture is completely defined by quick, hyper-flavorful, spicy plant-based snacks eaten on the go by millions.",
        dishes: [
            {
                name: "Vada Pav",
                type: "Spiced Potato Bun",
                desc: "The quintessential burger of India. A crispy deep-fried spiced potato dumpling (batata vada) nestled inside a soft sliced bun (pav), slathered in dry garlic chili powder and sweet tamarind sauce.",
                emoji: "🍔",
                ingredients: ["Potatoes", "Gram Flour", "Garlic Chili Chutney", "Pav Bun", "Mustard Seeds"],
                bestWith: "Fried Salted Green Chilies"
            },
            {
                name: "Misal Pav",
                type: "Fiery Sprout Stew",
                desc: "A spicy, fiery curry made of moth bean sprouts (moth dal) topped with crunchy gram flour mix (farsan), chopped onions, fresh coriander, and served with butter-toasted buns.",
                emoji: "🍜",
                ingredients: ["Sprouted Moth Beans", "Goda Masala Spices", "Farsan (Crisps)", "Onions", "Lemon Juice"],
                bestWith: "A squeeze of fresh lemon and sweet yogurt"
            },
            {
                name: "Pav Bhaji",
                type: "Velvety Mashed Veg Curry",
                desc: "A rich, slow-simmered blend of mashed cauliflowers, potatoes, green peas, and tomatoes cooked in heavy spices on flat iron griddles, served with soft butter-drenched buns.",
                emoji: "🍛",
                ingredients: ["Potatoes", "Green Peas", "Cauliflower", "Butter", "Pav Bhaji Masala Blend"],
                bestWith: "Finely diced red onions and lemon"
            }
        ],
        locations: [
            {
                name: "Girish Samosa & Vada Centre",
                tag: "Legacy Street Snack Spot",
                address: "Mithibai College Road, Vile Parle West, Mumbai",
                highlights: "Famous local street spot crowded all day. Serves some of Mumbai's most buttery pav bhaji and piping hot crispy vada pavs with custom spicy liquid dips.",
                rating: "⭐⭐⭐⭐⭐"
            },
            {
                name: "Aaswad Uphaar Gruha",
                tag: "Authentic Maharashtrian Dining",
                address: "Shivaji Park, Dadar West, Mumbai",
                highlights: "Winner of global street food awards. Famous for authentic traditional Maharashtrian vegetarian specialties like Misal Pav, Kothimbir Vadi, and sweet Shrikhand.",
                rating: "⭐⭐⭐⭐⭐"
            }
        ]
    }
};

class App {
    constructor() {
        this.activePage = 'home';
        this.canvas = null;
        this.ctx = null;
        this.blobs = [];
        this.mousePos = { x: 0, y: 0 };
        this.scrollOffset = 0;
        this.sidebarOpen = false;
        
        this.init();
    }

    init() {
        // Init Theme System
        this.setupTheme();

        // Init Navigation Menu Drawers
        this.setupNavigation();
        
        // Init Canvas Background
        this.setupCanvas();
        
        // Init Modals for Recipe cards
        this.setupRecipeModals();
        
        // Init Cuisines List & Filter
        this.setupCuisineExplorer();

        // Init Local Guide page data
        this.setupLocalGuide();
        
        // Init Feedback system
        this.setupFeedback();

        // Scroll reveals for timeline
        this.setupScrollTriggers();

        // Init 3D Parallax floating background
        this.setup3DParallax();

        // Size changes listener
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
        window.addEventListener('scroll', () => {
            this.scrollOffset = window.scrollY;
        });
    }

    /* --- SIDEBAR AND SPA NAVIGATION ROUTING --- */
    setupNavigation() {
        const pizzaMenuBtn = document.getElementById('pizza-menu-btn');
        const sidebarMenu = document.getElementById('sidebar-menu');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const closeSidebarBtn = document.getElementById('close-sidebar-btn');
        
        // Pizza slice toggle sidebar
        if (pizzaMenuBtn && sidebarMenu && sidebarOverlay) {
            pizzaMenuBtn.addEventListener('click', () => {
                this.toggleSidebar(true);
            });
            
            sidebarOverlay.addEventListener('click', () => {
                this.toggleSidebar(false);
            });
            
            if (closeSidebarBtn) {
                closeSidebarBtn.addEventListener('click', () => {
                    this.toggleSidebar(false);
                });
            }
        }

        // Bind all nav links (inside sidebar, header logo, etc.)
        const navLinks = document.querySelectorAll('.nav-link, .sidebar-link, .brand-logo-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-target');
                if (!targetPage) return;
                
                // Hide sidebar drawer
                this.toggleSidebar(false);
                
                // Update active states
                document.querySelectorAll('.sidebar-link').forEach(l => {
                    if (l.getAttribute('data-target') === targetPage) l.classList.add('active');
                    else l.classList.remove('active');
                });

                if (targetPage === this.activePage) return;
                
                // Route transition
                this.transitionPages(targetPage);
            });
        });
    }

    toggleSidebar(open) {
        const sidebarMenu = document.getElementById('sidebar-menu');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const pizzaMenuBtn = document.getElementById('pizza-menu-btn');
        
        if (!sidebarMenu) return;

        this.sidebarOpen = open;
        if (open) {
            sidebarMenu.classList.add('open');
            sidebarOverlay.classList.add('visible');
            pizzaMenuBtn?.classList.add('active');
        } else {
            sidebarMenu.classList.remove('open');
            sidebarOverlay.classList.remove('visible');
            pizzaMenuBtn?.classList.remove('active');
        }
    }

    transitionPages(targetPage) {
        const currentPageEl = document.getElementById(this.activePage);
        const nextPageEl = document.getElementById(targetPage);
        
        if (!currentPageEl || !nextPageEl) return;

        // Slide viewport horizontally back to left screen if currently on the media view
        const container = document.querySelector('.app-container');
        if (container && container.classList.contains('slide-right')) {
            container.classList.remove('slide-right');
            // Allow small delay to let horizontal slide animation complete, or transition immediately
        }

        // Fade out active page content
        currentPageEl.classList.remove('active');
        currentPageEl.classList.add('fade-out');
        
        setTimeout(() => {
            currentPageEl.style.display = 'none';
            currentPageEl.classList.remove('fade-out');
            
            // Show next page
            nextPageEl.style.display = 'block';
            nextPageEl.offsetHeight; // Force reflow
            nextPageEl.classList.add('active');
            
            this.activePage = targetPage;
            
            // Smoothly scroll the left pane container up to the top
            const leftPane = document.getElementById('main-content-scroll');
            if (leftPane) {
                leftPane.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Re-trigger scroll reveals
            this.revealOnScroll();
        }, 250);
    }

    /* --- DYNAMIC LOCAL FOOD GUIDE PAGE --- */
    setupLocalGuide() {
        const localCityTabs = document.querySelectorAll('.local-tab-btn');
        if (localCityTabs.length === 0) return;

        // Render Raipur, Chhattisgarh as default
        this.renderLocalCityGuide('raipur');

        localCityTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                localCityTabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const cityKey = btn.getAttribute('data-city');
                this.renderLocalCityGuide(cityKey);
            });
        });
    }

    renderLocalCityGuide(cityKey) {
        const data = LOCAL_GUIDE_DATA[cityKey];
        const container = document.getElementById('local-guide-content');
        if (!data || !container) return;

        // Build HTML template
        let dishesHtml = '';
        data.dishes.forEach(dish => {
            let ingredientsTags = '';
            dish.ingredients.forEach(ing => {
                ingredientsTags += `<span class="ing-badge">${ing}</span>`;
            });

            dishesHtml += `
                <div class="local-dish-card" data-cursor-food="${cityKey === 'raipur' ? '🥟' : '🍔'}">
                    <div class="local-dish-header">
                        <span class="local-dish-emoji">${dish.emoji}</span>
                        <div>
                            <h4>${dish.name}</h4>
                            <span class="local-dish-type">${dish.type}</span>
                        </div>
                    </div>
                    <p class="local-dish-desc">${dish.desc}</p>
                    <div class="local-dish-ingredients">
                        <strong>Keys:</strong>
                        <div class="ing-badge-group">${ingredientsTags}</div>
                    </div>
                    <div class="local-dish-best">
                        🍲 <strong>Best with:</strong> ${dish.bestWith}
                    </div>
                </div>
            `;
        });

        let locationsHtml = '';
        data.locations.forEach(loc => {
            locationsHtml += `
                <div class="local-loc-card" data-cursor-food="📍">
                    <div class="local-loc-header">
                        <div>
                            <h5>${loc.name}</h5>
                            <span class="local-loc-tag">${loc.tag}</span>
                        </div>
                        <span class="local-loc-rating">${loc.rating}</span>
                    </div>
                    <p class="local-loc-highlights">${loc.highlights}</p>
                    <div class="local-loc-address">
                        🗺️ <strong>Location:</strong> ${loc.address}
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="local-city-hero-card">
                <div class="card-liquid-blob" style="background: var(--c-gold-accent); top:-50px; right:-30px;"></div>
                <h3>${data.cityName}</h3>
                <span class="local-state-badge">📍 Region: ${data.stateName}</span>
                <p class="local-city-description">${data.description}</p>
            </div>
            
            <div class="local-sections-grid">
                <section class="local-dishes-column">
                    <h3 class="local-col-title">Signature Delicacies</h3>
                    <div class="local-dishes-list">${dishesHtml}</div>
                </section>
                
                <section class="local-locations-column">
                    <h3 class="local-col-title">Legendary Places to Eat</h3>
                    <div class="local-locations-list">${locationsHtml}</div>
                </section>
            </div>
        `;
    }

    /* --- INTERACTIVE CANVAS BACKDROP (LIQUID BLOBS) --- */
    /* --- THEME TOGGLE & CANVAS PALETTES --- */
    setupTheme() {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (!themeBtn) return;

        // Load saved theme
        const savedTheme = localStorage.getItem('frozen_theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
        
        if (isDark) {
            document.body.classList.add('dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('data-cursor-food', '☀️');
            themeBtn.setAttribute('aria-label', 'Toggle light mode');
        } else {
            document.body.classList.remove('dark-theme');
            themeBtn.textContent = '🌙';
            themeBtn.setAttribute('data-cursor-food', '🌙');
            themeBtn.setAttribute('aria-label', 'Toggle dark mode');
        }

        themeBtn.addEventListener('click', () => {
            const willBeDark = !document.body.classList.contains('dark-theme');
            if (willBeDark) {
                document.body.classList.add('dark-theme');
                themeBtn.textContent = '☀️';
                themeBtn.setAttribute('data-cursor-food', '☀️');
                themeBtn.setAttribute('aria-label', 'Toggle light mode');
                localStorage.setItem('frozen_theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('data-cursor-food', '🌙');
                themeBtn.setAttribute('aria-label', 'Toggle dark mode');
                localStorage.setItem('frozen_theme', 'light');
            }
            
            this.updateCanvasColors();
        });
    }

    getCanvasColors() {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            return [
                'rgba(212, 163, 115, 0.07)', // Warm Gold
                'rgba(181, 72, 63, 0.05)',   // Terracotta Red
                'rgba(44, 24, 14, 0.40)',    // Dark Velvet Espresso
                'rgba(93, 67, 49, 0.08)'     // Bronze Medium
            ];
        } else {
            return [
                'rgba(212, 163, 115, 0.12)', // Warm Gold
                'rgba(181, 72, 63, 0.08)',   // Terracotta Red
                'rgba(244, 236, 225, 0.40)', // Beige Linen
                'rgba(164, 180, 148, 0.12)'  // Sage Green
            ];
        }
    }

    updateCanvasColors() {
        if (!this.canvas) return;
        const colors = this.getCanvasColors();
        this.blobs.forEach((blob, idx) => {
            blob.color = colors[idx % colors.length];
        });
    }

    /* --- 3D PARALLAX BACKGROUND EFFECT --- */
    setup3DParallax() {
        const items = document.querySelectorAll('.parallax-item');
        if (items.length === 0) return;

        window.addEventListener('mousemove', (e) => {
            const mx = e.clientX;
            const my = e.clientY;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            // Normalized delta from center (-1 to 1)
            const dx = (mx - cx) / cx;
            const dy = (my - cy) / cy;

            items.forEach(item => {
                const depth = parseFloat(item.getAttribute('data-depth')) || 0.2;
                
                // Translate values: shift item based on mouse direction and depth
                const tx = dx * depth * 75; // translate X
                const ty = dy * depth * 75; // translate Y
                
                // Tilt values: rotate based on position
                const rx = -dy * depth * 35; // rotate X (up/down tilt)
                const ry = dx * depth * 35;  // rotate Y (left/right tilt)
                
                // Z offset based on depth to push or pull
                const z = depth * 40;

                // Apply premium 3D transformation
                item.style.transform = `translate3d(${tx}px, ${ty}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            });
        });
    }

    /* --- INTERACTIVE CANVAS BACKDROP (LIQUID BLOBS) --- */
    setupCanvas() {
        this.canvas = document.getElementById('liquid-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.onResize();

        // Initialize organic blobs
        const colors = this.getCanvasColors();

        for (let i = 0; i < 5; i++) {
            this.blobs.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 200 + 150,
                color: colors[i % colors.length],
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                pulseSpeed: Math.random() * 0.005 + 0.002,
                pulseOffset: Math.random() * Math.PI,
                pulseRange: Math.random() * 40 + 20
            });
        }

        this.animateCanvas();
    }

    onResize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render each organic blob with soft shadow edges
        this.blobs.forEach(blob => {
            // Apply drift speed
            blob.x += blob.vx;
            blob.y += blob.vy;
            
            // Hover reaction: attract/repel slightly
            const dx = this.mousePos.x - blob.x;
            const dy = this.mousePos.y - blob.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 400) {
                blob.x -= (dx / dist) * 0.3;
                blob.y -= (dy / dist) * 0.3;
            }

            // Boundary collision
            if (blob.x - blob.radius < 0 || blob.x + blob.radius > this.canvas.width) blob.vx *= -1;
            if (blob.y - blob.radius < 0 || blob.y + blob.radius > this.canvas.height) blob.vy *= -1;

            // Breathing pulse animation
            const pulse = Math.sin(Date.now() * blob.pulseSpeed + blob.pulseOffset) * blob.pulseRange;
            const currentRadius = blob.radius + pulse;

            // Drawing blob
            this.ctx.beginPath();
            const grad = this.ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, currentRadius);
            grad.addColorStop(0, blob.color);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.fillStyle = grad;
            this.ctx.arc(blob.x, blob.y, currentRadius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animateCanvas());
    }

    /* --- RECIPE SHOWCASE DETAIL MODALS --- */
    setupRecipeModals() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        const modal = document.getElementById('recipe-modal');
        const closeModalBtn = modal.querySelector('.close-modal');

        if (!modal) return;

        recipeCards.forEach(card => {
            card.addEventListener('click', () => {
                const recipeId = card.getAttribute('data-recipe');
                const data = RECIPE_DATA[recipeId];
                if (!data) return;

                // Populate modal
                modal.querySelector('.modal-title').textContent = data.title;
                modal.querySelector('.modal-tagline').textContent = data.tagline;
                modal.querySelector('.meta-prep').innerHTML = `⏱️ <strong>Prep:</strong> ${data.prep}`;
                modal.querySelector('.meta-cook').innerHTML = `🍳 <strong>Cook:</strong> ${data.cook}`;
                modal.querySelector('.meta-servings').innerHTML = `👥 <strong>Servings:</strong> ${data.servings}`;
                modal.querySelector('.meta-diff').innerHTML = `⭐ <strong>Difficulty:</strong> ${data.difficulty}`;

                // Ingredients
                const ingContainer = modal.querySelector('.ingredients-list');
                ingContainer.innerHTML = '';
                data.ingredients.forEach(ing => {
                    const li = document.createElement('li');
                    li.textContent = ing;
                    ingContainer.appendChild(li);
                });

                // Steps
                const stepContainer = modal.querySelector('.steps-list');
                stepContainer.innerHTML = '';
                data.steps.forEach((step, idx) => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span class="step-num">${idx + 1}</span><p>${step}</p>`;
                    stepContainer.appendChild(li);
                });

                // Display modal
                modal.classList.add('show');
                
                // Block scroll inside left-pane content wrapper
                const leftPane = document.getElementById('main-content-scroll');
                if (leftPane) leftPane.style.overflowY = 'hidden';
            });
        });

        const closeModalFunc = () => {
            modal.classList.remove('show');
            const leftPane = document.getElementById('main-content-scroll');
            if (leftPane) leftPane.style.overflowY = 'auto';
        };

        closeModalBtn.addEventListener('click', closeModalFunc);

        // Close on click outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    /* --- GLOBAL CUISINE FILTERING --- */
    setupCuisineExplorer() {
        const container = document.getElementById('cuisines-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!container) return;

        // Render initially
        this.renderCuisines(GLOBAL_CUISINES);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                if (filter === 'all') {
                    this.renderCuisines(GLOBAL_CUISINES);
                } else {
                    const filtered = GLOBAL_CUISINES.filter(c => c.region.toLowerCase() === filter.toLowerCase());
                    this.renderCuisines(filtered);
                }
            });
        });
    }

    renderCuisines(cuisines) {
        const container = document.getElementById('cuisines-grid');
        container.innerHTML = '';

        if (cuisines.length === 0) {
            container.innerHTML = '<div class="no-results">No dishes found matching this criteria.</div>';
            return;
        }

        cuisines.forEach((c, idx) => {
            const card = document.createElement('div');
            card.className = 'cuisine-detail-card';
            card.style.animationDelay = `${idx * 0.08}s`;
            
            let cursorFood = '🥗';
            if (c.name.includes("Italian")) cursorFood = '🍕';
            if (c.name.includes("Indian")) cursorFood = '🍛';
            if (c.name.includes("Mexican")) cursorFood = '🌮';
            if (c.name.includes("Japanese")) cursorFood = '🍜';
            if (c.name.includes("Middle Eastern")) cursorFood = '🥙';

            card.setAttribute('data-cursor-food', cursorFood);

            card.innerHTML = `
                <div class="cuisine-header">
                    <span class="cuisine-emoji">${c.emoji}</span>
                    <span class="cuisine-badge">${c.region}</span>
                </div>
                <h3>${c.dish}</h3>
                <h4 class="cuisine-orig">${c.name}</h4>
                <p>${c.desc}</p>
                <div class="cuisine-footer">
                    <span>🌶️ Spicy: <strong>${c.spicy}</strong></span>
                    <span>⏱️ Time: <strong>${c.time}</strong></span>
                </div>
            `;
            container.appendChild(card);
        });
    }

    /* --- SCROLL REVEALS (TIMELINE) --- */
    setupScrollTriggers() {
        const leftPane = document.getElementById('main-content-scroll');
        if (leftPane) {
            leftPane.addEventListener('scroll', () => this.revealOnScroll());
        }
        this.revealOnScroll(); // Initial load run
    }

    revealOnScroll() {
        const items = document.querySelectorAll('.timeline-item');
        const leftPane = document.getElementById('main-content-scroll');
        if (!leftPane) return;

        const triggerBottom = leftPane.clientHeight * 0.85;

        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('visible');
            }
        });
    }

    /* --- FEEDBACK LOUNGE --- */
    setupFeedback() {
        const form = document.getElementById('feedback-form');
        const feedbackBoard = document.getElementById('feedback-board');
        const ratingEmojis = document.querySelectorAll('.rating-emoji');
        const selectedRatingInput = document.getElementById('selected-rating');

        if (!form) return;

        // Emoji rating selector logic
        ratingEmojis.forEach(emoji => {
            emoji.addEventListener('click', () => {
                ratingEmojis.forEach(e => e.classList.remove('selected'));
                emoji.classList.add('selected');
                selectedRatingInput.value = emoji.getAttribute('data-value');
            });
        });

        // Load existing feedback
        this.loadFeedback();

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('feedback-name').value.trim();
            const note = document.getElementById('feedback-text').value.trim();
            const rating = selectedRatingInput.value || '🍦';

            if (!name || !note) {
                alert("Please fill in your sweet culinary name and thoughts!");
                return;
            }

            const feedbackItem = {
                name,
                note,
                rating,
                date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
            };

            // Save to localStorage
            const localList = JSON.parse(localStorage.getItem('frozen_feedback') || '[]');
            localList.unshift(feedbackItem);
            localStorage.setItem('frozen_feedback', JSON.stringify(localList));

            // Reset Form and selections
            form.reset();
            ratingEmojis.forEach(e => e.classList.remove('selected'));
            selectedRatingInput.value = '';

            // Animate submission success
            this.showFeedbackSuccess();

            // Refresh Board
            this.loadFeedback();
        });
    }

    loadFeedback() {
        const board = document.getElementById('feedback-board');
        if (!board) return;

        const defaultFeedback = [
            {
                name: "Aria Thorne",
                note: "The Szechuan handmade noodles literally changed my life! The heat level was perfect and it plated so beautifully. Highly recommended!",
                rating: "🍜",
                date: "May 22, 2026"
            },
            {
                name: "Chef Julian",
                note: "As a professional vegan chef, I'm absolutely blown away by the texture balance in the Cashew Mozzarella Pizza. Liquid-glass perfection!",
                rating: "🍕",
                date: "May 20, 2026"
            },
            {
                name: "Chloe Sterling",
                note: "I cooked the Alphonso mango coconut parfait for my family dinner and there wasn't a single spoon left. The glass interface made it so fun to read!",
                rating: "🍨",
                date: "May 18, 2026"
            }
        ];

        const savedFeedback = JSON.parse(localStorage.getItem('frozen_feedback') || '[]');
        const fullList = [...savedFeedback, ...defaultFeedback];

        board.innerHTML = '';
        fullList.forEach((fb, idx) => {
            const card = document.createElement('div');
            card.className = 'feedback-board-card';
            card.style.animationDelay = `${idx * 0.08}s`;
            card.innerHTML = `
                <div class="fb-card-header">
                    <span class="fb-card-name">${fb.name}</span>
                    <span class="fb-card-rating">${fb.rating}</span>
                </div>
                <p class="fb-card-note">"${fb.note}"</p>
                <div class="fb-card-footer">
                    <span>🗓️ ${fb.date}</span>
                </div>
            `;
            board.appendChild(card);
        });
    }

    showFeedbackSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback-success-banner';
        successMessage.innerHTML = '✨ Feedback Submitted! Thank you for the delicious love. 🧁';
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.classList.add('show');
        }, 10);

        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => successMessage.remove(), 400);
        }, 4000);
    }
}

// Initialise App once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.AppInstance = new App();
});
