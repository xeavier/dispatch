import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { NewsApiService } from '../news-api.service';
import { Http, Response } from '@angular/http';
import { MapComponent } from '../map/map.component';

import * as __ from "lodash";
import * as _ from "underscore";
import * as $ from 'jquery';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  //IMAGES
  private eventRegistryLogo: string = 'https://pbs.twimg.com/profile_images/875698295808679936/b1Pqj1by_400x400.jpg';
  private amChartsLogo: string = 'https://avatars0.githubusercontent.com/u/1116146?s=400&v=4';
  private newsLogo: string = 'https://image.freepik.com/free-icon/news-logo_318-38132.jpg';


  //EVENT REGISTRY JSONS
  private eventRegistryBBC: any = [];
  private eventRegistryGuardian: any = [];
  private eventRegistryCNN: any = [];
  private eventRegistryWAPO: any = [];
  private eventRegistryReuters: any = [];
  private eventRegistryNYT: any = [];
  private eventRegistryEconomist: any = [];
  private eventRegistryAP: any = [];
  private eventRegistryWSJ: any = [];
  private eventRegistryNewswire: any = [];

  //NEWS API JSONS
  private bbcJSON: any;
  private alJazeeraJSON: any;
  private bingWorldJSON: any;
  private bingPoliticsJSON: any;
  private apJSON: any;
  private googleJSON: any;
  private economistJSON: any;
  private nytJSON: any;
  private wapoJSON: any;
  private cnnJSON: any;
  private newsweekJSON: any;
  private reutersJSON: any;
  private guardianUkJSON: any;
  private guardianAuJSON: any;
  private huffPostJSON: any;
  private wsjJSON: any;

  //ARRAY OF SELECTED COUNTRY KEYWORD ARRAYS
  private allCountryArrays: any = [];

  //Matched Article Keys/Properties to display in DOM
  private newsApiMatches: any = [];
  private bingApiMatches: any = [];
  private eventRegistryMatchesArray: any = [];
  private allMatches: any = [];
  private filteredMatches: any = [];
  private doubleFilteredMatches: any = [];

  //COUNTRY KEYWORD ARRAYS

  //NORTH AMERICA
  private americanArray: Array<string> = ["NSA", "CIA", "FBI", "United States", "U.S.", "US", "America", "American", "Americans", "Trump", "Trump's", "Mike Pence", "White House", "Washington", "Clinton", "Obama", "NAFTA", "Comey"];
  private canadaArray: Array<string> = ["Canada", "Canadian", "Canada's", "Canadians", "Canadian's", "Trudeau", "Justin Trudeau", "Toronto", "Columbia", "Vancouver B.C.", "Vancouver, B.C.", "NAFTA"];
  private mexicoArray: Array<string> = ["Mexico", "Mexican", "Mexicans", "Mexico's", "Mexican's", "Mexico City", "NAFTA", "Vicente Fox", "Peña Nieto"];

  //SOUTH AMERICA
  private brazilArray: Array<string> = ["Brazil", "Brasil", "Brazil's", "Brasil's", "Brazilian", "Brasilian", "Brazilian's", "Brasilian's", "Rio de Janeiro", "Sao Paulo", "Michel Temer"];
  private argentinaArray: Array<string> = ["Argentina", "Argentinian", "Argentina's", "Argentinian's", "Argentinians'", "Buenos Aires", "Mauricio Macri"];
  private colombiaArray: Array<string> = ["Colombia", "Colombians", "Columbia's", "FARC", "Juan Manuel Santos", "Bogotá"];
  private boliviaArray: Array<string> = ["Bolivia", "Bolivia's", "Bolivian", "Bolivians", "Evo Morales", "Sucre"];
  private peruArray: Array<string> = ["Peru", "Peru's", "Peruvians", "Lima", "Pedro Pablo Kuczynski"];
  private ecuadorArray: Array<string> = ["Ecuador", "Ecuador's", "Rafael Correa", "Quito"];
  private venezuelaArray: Array<string> = ["Venezuela", "Venezuelan", "Venezuela's", "Caracas", "Nicolás Maduro"];
  private chileArray: Array<string> = ["Chile", "Chile's", "Chilean", "Michelle Bachelet", "Santiago"];
  private paraguayArray: Array<string> = ["Paraguay", "Paraguay's", "Paraguayan", "Asunción", "Horacio Cartes"];
  private uruguayArray: Array<string> = ["Uruguay", "Uruguay's", "Uruguayan", "Tabaré Vázquez", "Montevideo"];
  private guyanaArray: Array<string> = ["Guyana", "Guyanan", "Guyana's", "David A. Granger"];
  private surinameArray: Array<string> = ["Suriname", "Suriname's", "Paramaribo", "Dési Bouterse"];
  private frenchGuianaArray: Array<string> = ["French Guiana", "French Guianan", "Guiana", "Rodolphe Alexandre"];


//CARIBBEAN AND CENTRAL AMERICA
  private haitiArray: Array<string> = ["Haiti", "Haitian", "Haitians", "Haitian's", "Haiti's", "Port-au-Prince", "Labadee", "Jacamel", "Jovenel Moïse"];
  private dominicanRepublicArray: Array<string> = ["Dominican Republic", "Dominican", "Dominicans", "Dominican's", "Dominican Republic's", "Santo Domingo", "Danilo Medina", "Punta Cano", "Bávaro"];
  private puertoRicoArray: Array<string> = ["Puerto Rico", "Puerto Rican", "Puerto Rico's", "Puerto Ricans", "San Juan", "El Yunque National Forest"];
  private bahamasArray: Array<string> = ["Bahamas", "Bahamian", "Bahamian", "Bahamians", "Nassau", "Andros Barrier Reef"];
  private jamaicaArray: Array<string> = ["Jamaica", "Jamaica's", "Jamaicans", "Jamaican's", "Kingston", "Dunn's River Falls", "Montego Bay", "Negril", "Ocho Rios"];
  private cubaArray: Array<string> = ["Cuba", "Cuban", "Cuba's", "Cuban's", "Fidel Castro", "Raul Castro", "Che Guevara"];
  private guatemalaArray: Array<string> = ["Guatemala", "Guatemala's", "Guatemalan", "Guatemalans", "Guatemalan's", "Guatemala City", "Tikal", "Lake Atitlán", "Semuc Champey"];
  private belizeArray: Array<string> = ["Belize", "Belize's", "Belizean", "Belmopan", "Ambergris Caye", "Xunantunich", "Placencia", "Great Blue Hole"];
  private elSalvadorArray: Array<string> = ["El Salvador", "El Salvador's", "El Salvadorian", "El Salvadorians", "San Salvador", "Salvador Sánchez Cerén", "Coatepeque Caldera", "Teopán Island", "Tazumal"];
  private hondurasArray: Array<string> = ["Honduras", "Honduran", "Hondurans", "Honduran's", "Tegucigalpa", "Juan Orlando Hernández", "Roatán"];
  private nicaraguaArray: Array<string> = ["Nicaragua", "Nicaraguan", "Nicaraguans", "Nicaraguan's", "Nicaragua's", "Managua", "Daniel Ortega", "Corn Islands", "Apoyo Lagoon Natural Reserve"];
  private costaRicaArray: Array<string> = ["Costa Rica", "Costa Rican", "Costa Ricans", "Costa Rica's", "Costa Rican's", "San José", "Arenal Volcano", "Corcovado National Park", "Manuel Antonio National Park", "Monteverde Cloud Forest Reserve", "Tortuguero National Park"];
  private panamaArray: Array<string> = ["Panama", "Panama's", "Panamanian", "Panamanians", "Panamanian's", "Panama City", "Panama Canal", "Panamá Viejo", "Juan Carlos Varela"];


  //OCEANIA
  private australiaArray: Array<string> = ["Australia", "Australia's", "Australian", "Australians", "Aussie", "Malcolm Turnbull", "Tony Abbott"];
  private newZealandArray: Array<string> = ["New Zealand", "New Zealand's", "Kiwi", "Auckland", "Wellington", "NZ"];
  private papuaNewGuineaArray: Array<string> = ["Papua New Guinea", "Port Moresby", "Papua New Guinean"];

  private kiribatiArray: Array<string> = ["Kiribati", "South Tarawa", "Butaritari", "Taneti Mamau"];
  private frenchPolynesiaArray: Array<string> = ["French Polynesia", "French Polynesian", "French Polynesia's", "French Polynesians", "Papeete", "Bora Bora", "Pā'ōfa'i Gardens", "Tahiti", "Mo'orea", "Papeete", "Rangiroa"];
  private guamArray: Array<string> = ["Guam", "Guam's", "Guamian", "Umatac", "Fort Nuestra Señora de la Soledad"];
  private micronesiaArray: Array<string> = ["Federated States of Micronesia", "Micronesia", "Micronesian", "Micronesia's", "Micronesians", "Palikir", "Nan Madol", "Pakin Atoll", "Peter M. Christian"];
  private palauArray: Array<string> = ["Palau", "Palauan", "Palau's", "Ngerulmud", "Tommy Remengesau"];
  private solomonIslandsArray: Array<string> = ["Solomon Islands", "Guadalcanal", "Honiara"];
  private vanuatuArray: Array<string> = ["Vanuatu", "Vanuatuan", "Vanuatu's", "Port Vila", "Efate", "Melanesian"];
  private fijiArray: Array<string> = ["Fiji", "Fijian", "Fiji's", "Fijians", "Suva", "Viti Levu", "Vanua Levu"];
  private samoaArray: Array<string> = ["Samoa", "Samoan", "Samoa's", "Samoans", "Apia", "Savai'i"];
  private tongaArray: Array<string> = ["Tonga", "Tongan", "Tonga's", "Tongans", "Nukuʻalofa", "Tupou VI"];
  private niueArray: Array<string> = ["Niue", "Niue's", "Alofi"];
  private newCaledoniaArray: Array<string> = ["New Caledonia", "New Caledonian", "New Caledonians", "New Caledonia's", "Nouméa"];
  private frenchSouthernArray: Array<string> = ["French Southern and Antarctic Islands"];
  private heardIslandArray: Array<string> = ["Heard Island and McDonald Islands", "Mawson Peak"];
  private southSandwichArray: Array<string> = ["South Georgia and South Sandwich Islands"];
  private bouvetIslandArray: Array<string> = ["Bouvet Island"];
  private falklandIslandsArray: Array<string> = ["Falkland Islands", "East Falkland", "Falklands"];
  private cookIslandsArray: Array<string> = ["Cook Islands", "Avarua", "Cook Islanders"];




  //ASIA
  private chinaArray: Array<string> = ["China", "Chinese", "China's", "Beijing", "Xi Jinping", "Tibet", "Tibetan", "Tibet's", "Tibetans", "Dalai Lama", "Lhasa", "Yangtze", "Yellow River", "Uyghurs", "Hui"];
  private taiwanArray: Array<string> = ["Taiwan", "Taiwanese", "Tsai Ing-wen"];
  private northKoreaArray: Array<string> = ["North Korea", "North Korean", "Pyongyang", "Kim Jong Un", "Kim Jong-Un", "North Koreans"];
  private southKoreaArray: Array<string> = ["South Korea", "South Korean", "Seoul"];
  private japanArray: Array<string> = ["Japan", "Japanese", "Japan's", "Shinzo Abe", "Tokyo", "Nagasaki"];
  private indonesiaArray: Array<string> = ["Indonesia", "Indonesian", "Indonesians", "Indonesia's", "Jakarta", "Bali", "Joko Widodo"];
  private philippinesArray: Array<string> = ["Philippines", "Duterte", "Rodrigo Duterte", "Manila"];
  private malaysiaArray: Array<string> = ["Malaysia", "Malaysian", "Malaysia's", "Kuala Lumpur", "Dato' Sri Haji"];
  private cambodiaArray: Array<string> = ["Cambodia", "Cambodian", "Cambodia's", "Phnom Penh", "Hun Sen"];
  private vietnamArray: Array<string> = ["Vietnam", "Vietnamese", "Vietnam's", "Hanoi"];
  private thailandArray: Array<string> = ["Thailand", "Thailand's", "Thai", "Bangkok", "Somsak Kiatsuranont", "Bhumibol Adulyadej", "Yingluck Shinawatra"];
  private laosArray: Array<string> = ["Lao People's Democratic Republic", "Laos", "Vientiane", "Khmer"];
  private myanmarArray: Array<string> = ["Myanmar", "Myanmar's", "Burma", "Naypyidaw", "Burmese", "Htin Kyaw"];
  private mongoliaArray: Array<string> = ["Mongolia", "Mongolian", "Mongolia's", "Ulaanbaatar", "Gobi", "Tsakhiagiin Elbegdorj"];
  private nepalArray: Array<string> = ["Nepal", "Nepali", "Nepal's", "Nepalese", "Kathmandu", "Everest", "Bidhya Devi Bhandari"];
  private indiaArray: Array<string> = ["India", "Indian", "India's", "New Delhi", "Mumbai", "Narendra Modi", "Kashmir"];
  private sriLankaArray: Array<string> = ["Sri Lanka", "Sri Lankan", "Sri Lanka's", "Sri Lankans", "Ceylon", "Sri Jayawardenepura Kotte", "Sri Jayawardenepura Kotte", "Anuradhapura", "Sigiriya"];
  private bangladeshArray: Array<string> = ["Bangladesh", "Bangladeshi", "Bangladeshi's", "Bangladeshis", "Dhaka", "Abdul Hamid", "Sundarbans", "Royal Bengal Tiger", "Bengal Tiger", "Sundarbans", "Sylhet"];

  private georgiaArray: Array<string> = ["Georgia", "Republic of Georgia", "Tbilisi", "Giorgi Margvelashvili", "Batumi", "Svaneti", "Borjomi", "Narikala"];
  private armeniaArray: Array<string> = ["Armenia", "Armenian", "Armenia's", "Armenians", "Yerevan", "Mount Ararat", "Mt. Ararat", "Etchmiadzin Cathedral", "Geghard", "Lake Sevan", "Khor Virap", "Tatev monastery", "Tsaghkadzor"];
  private azerbaijanArray: Array<string> = ["Azerbaijan", "Azerbaijani", "Azerbaijan's", "Palace of the Shirvanshahs", "Baku", "Quba", "Qabala", "Ilham Aliyev", "Maiden Tower"];
  private turkmenistanArray: Array<string> = ["Turkmenistan", "Turkmenistan's", "Turkmenistani", "Karakum Desert", "Ashgabat", "Gurbanguly Berdimuhamedow", "Derweze", "Awaza"];
  private uzbekistanArray: Array<string> = ["Uzbekistan", "Uzbekistan's", "Uzbekistani", "Uzbekistani's", "Tashkent", "Shavkat Mirziyoyev", "Registan"];
  private tajikistanArray: Array<string> = ["Tajikistan", "Tajikistani", "Tajikistan's", "Tajikistanis", "Dushanbe", "Iskanderkulsky Nature Refuge", "Fann Mountains", "Khujand", "Khorugh", "Karakul"];
  private kyrgyzstanArray: Array<string> = ["Kyrgyzstan", "Kyrgyzstan's", "Kyrgyzstani", "Kyrgyzstanis", "Bishkek", "Almazbek Atambayev", "Tash Rabat", "Issyk-Kul"];
  private kazakhstanArray: Array<string> = ["Kazakhstan", "Kazakhstan's", "Kazakhstani", "Kazakh", "Kazakgstanis", "Astana", "Nursultan Nazarbayev", "Almaty", "Astana", "Atyrau", "Bayterek Tower"];



  //THE MIDDLE EAST
  private pakistanArray: Array<string> = ["Pakistan", "Pakistani", "Pakistan's", "Kashmir", "Mamnoon Hussain", "Nawaz Sharif"];
  private afghanistanArray: Array<string> = ["Afghanistan", "Afghanistan's", "Kabul", "Afghani", "Hamid Karzai", "Ashraf Ghani"];
  private iranArray: Array<string> = ["Iran", "Iranian", "Iran's", "Iranians'", "Hassan Rouhani", "Khamenei", "Tehran"];
  private iraqArray: Array<string> = ["Iraq", "Iraqi", "Iraq's", "Baghdad", "Fuad Masum"];
  private jordanArray: Array<string> = ["Jordan", "Jordanian", "Jordan's", "Amman"];
  private israelArray: Array<string> = ["Israel", "Israeli", "Israel's", "Israelis", "Tel Aviv", "Reuven Rivlin", "Jerusalem", "Mossad", "IDF", "Shimon Peres", "Netanyahu"];
  private lebanonArray: Array<string> = ["Lebanon", "Lebanon's", "Lebanese", "Beirut", "Michel Aoun"];
  private yemenArray: Array<string> = ["Yemen", "Yemen's", "Yemeni", "Sana'a", "Abdrabbuh Mansur Hadi"];
  private omanArray: Array<string> = ["Oman", "Oman's", "Muscat", "Qaboos bin Said al Said", "Sultan Qaboos"];
  private syriaArray: Array<string> = ["Syria", "Syrian", "Syrians", "Syria's", "Assad", "Bashar al Assad", "ISIS", "ISIL", "Islamic State", "Free Syrian Army"];
  private saudiArabiaArray: Array<string> = ["Saudi Arabia", "Saudi", "Saudi's", "Saudi Arabian", "Saudi Arabia's", "King Salman"];
  private turkeyArray: Array<string> = ["Turkey", "Turkish", "Turkey's", "Erdogan", "Erdogan's"];


  //EUROPE
  private russiaArray: Array<string> = ["Russia", "Russia's", "Moscow", "Vladimir Putin", "Vladimir Putin's", "Putin", "Putin's", "Russian", "Soviet Union", "Soviet", "U.S.S.R.", "USSR", "Siberia", "Siberian", "Medvedev"];
  private ukraineArray: Array<string> = ["Ukraine", "Ukrainian", "Ukraine's", "Ukrainians", "Kiev", "Crimea"];
  private ukArray: Array<string> = ["United Kingdom", "UK", "Britain", "Brits", "Briton", "Britons", "Briton's", "British", "Britain's", "England's", "UK's", "U.K.'s", "U.K.", "England", "Queen Elizabeth", "Tony Blair", "Theresa May", "Brexit", "Scotland", "Scottish", "Scots", "Northern Ireland", "Northern Irish", "Saint Helena", "St. Helena island", "Cayman Islands"];
  private irelandArray: Array<string> = ["Ireland", "Ireland's", "Irish", "Dublin", "Michael D Higgins", "Enda Kenny"];
  private franceArray: Array<string> = ["France", "France's", "French", "Marine Le Pen", "Le Pen", "Emmanuel Macron", "Macron", "Paris"];
  private spainArray: Array<string> = ["Spain", "Spanish", "Spaniard", "Spaniard's", "Catalonia", "Catalunya", "Madrid", "Barcelona"];
  private portugalArray: Array<string> = ["Portugal", "Lisbon", "Marcelo Rebelo de Sousa"];
  private germanyArray: Array<string> = ["Germany", "German", "Berlin", "Angela Merkel", "Merkel"];
  private italyArray: Array<string> = ["Italy", "Italy's", "Italians", "Rome", "Sergio Mattarella"];
  private netherlandsArray: Array<string> = ["Netherlands", "Dutch", "Mark Rutte", "Amsterdam"];
  private belgiumArray: Array<string> = ["Belgium", "Belgium's", "Belgian", "Brussels", "City of Brussels", "Charles Michel"];
  private luxembourgArray: Array<string> = ["Luxembourg", "Jean-Claude Juncker", "Luxembourg City", "Luxembourg's"];
  private switzerlandArray: Array<string> = ["Switzerland", "Swiss", "Switzerland's", "Geneva", "Bern", "Doris Leuthard"];
  private austriaArray: Array<string> = ["Austria", "Austria's", "Austrian", "Vienna", "Salzburg", "Alexander Van der Bellen"];
  private sloveniaArray: Array<string> = ["Slovenia", "Slovenia's", "Slovenian", "Ljubljana", "Borut Pahor"];
  private czechRepublicArray: Array<string> = ["Czech Republic", "Czech", "Czech's", "Czech Republic's", "Prague", "Miloš Zeman"];
  private croatiaArray: Array<string> = ["Croatia", "Croatian", "Croatia's", "Zagreb", "Kolinda Grabar-Kitarović"];
  private bosniaHerzegovinaArray: Array<string> = ["Bosnia and Herzegovina", "Bosnian", "Bosnia's", "Sarajevo", "Mladen Ivanić"];
  private polandArray: Array<string> = ["Poland", "Polish", "Poland's", "Warsaw", "Andrzej Duda"];
  private slovakiaArray: Array<string> = ["Slovakia", "Slovakian", "Slovakia's", "Slovak", "Slovak's", "Bratislava", "Andrej Kiska"];
  private hungaryArray: Array<string> = ["Hungary", "Hungarian", "Hungary's", , "Hungarians", "Hungarian's", "Budapest", "János Áder"];
  private serbiaArray: Array<string> = ["Serbia", "Serbia's", "Serbian", "Serbians", "Serbian's", "Belgrade", "Tomislav Nikolić"];
  private montenegroArray: Array<string> = ["Montenegro", "Podgorica", "Filip Vujanović", "Montenegro's"];
  private kosovoArray: Array<string> = ["Kosovo", "Kosovo's", "Pristina", "Hashim Thaçi"];
  private albaniaArray: Array<string> = ["Albania", "Albanian", "Albania's", "Albanians", "Tirana", "Bujar Nishani"];
  private macedoniaArray: Array<string> = ["Macedonia", "Macedonia's", "Macedonian", "Macedonians", "Skopje", "Gjorge Ivanov"];
  private greeceArray: Array<string> = ["Greece", "Greece's", "Greek", "Athens", "Greek's", "Corinth", "Thebes", "Prokopis Pavlopoulos", "Alexis Tsipras"];
  private bulgariaArray: Array<string> = ["Bulgaria", "Bulgaria's", "Bulgarian", "Bulgarians", "Sofia", "Rumen Radev", "Ognyan Gerdzhikov"];
  private romaniaArray: Array<string> = ["Romania", "Romanian", "Romania's", "Romanians", "Bucharest", "Klaus Iohannis", "Sorin Grindeanu"];
  private moldovaArray: Array<string> = ["Moldova", "Moldovan", "Moldova's", "Moldovans", "Chișinău", "Igor Dodon", "Pavel Filip"];
  private belarusArray: Array<string> = ["Belarus", "Belarussian", "Minsk"];
  private lithuaniaArray: Array<string> = ["Lithuania", "Lithuanian", "Lithuania's", "Lithuanians", "Saulius Skvernelis", "Dalia Grybauskaitė", "Vilnius"];
  private latviaArray: Array<string> = ["Latvia", "Latvia's", "Latvian", "Latvians", "Riga", "Raimonds Vējonis", "Māris Kučinskis"];
  private estoniaArray: Array<string> = ["Estonia", "Estonia's", "Estonian", "Estonians", "Tallinn", "Kersti Kaljulaid"];
  private finlandArray: Array<string> = ["Finland", "Finland's", "Finnish", "Helsinki", "Sauli Niinistö", "Juha Sipilä"];
  private norwayArray: Array<string> = ["Norway", "Norway's", "Norwegian", "Norwegians", "Norwegian's", "Oslo", "Erna Solberg", "Harald V of Norway"];
  private swedenArray: Array<string> = ["Sweden", "Swede's", "Sweden's", "Swedish", "Stefan Löfven", "Stockholm", "Gothenburg", "Carl XVI Gustaf of Sweden"];
  private denmarkArray: Array<string> = ["Denmark", "Denmark's", "Danish", "Copenhagen", "Lars Løkke Rasmussen", "Margrethe II of Denmark"];
  private icelandArray: Array<string> = ["Iceland", "Iceland's", "Reykjavik", "Guðni Th. Jóhannesson", "Bjarni Benediktsson"];
  private greenlandArray: Array<string> = ["Greenland", "Greenland's", "Nuuk", "Kim Kielsen", "Margrethe II", "Greenlandic"];
  private faroeIslandsArray: Array<string> = ["Faroe Islands", "Tórshavn", "Aksel V. Johannesen"];
  private svalbardArray: Array<string> = ["Svalbard and Jan Mayen", "Svalbard", "Longyearbyen", "Spitsbergen"];





  //AFRICA
  private moroccoArray: Array<string> = ["Morocco", "Moroccan", "Morocco's", "Moroccans", "Rabat", "Berber", "Casablanca", "Marrakesh", "Fes", "Tangier", "King Hassan II"];
  private algeriaArray: Array<string> = ["Algeria", "Algerian", "Algeria's", "Algerians", "Oran", "Constantine", "Algiers", "Abdelaziz Bouteflika"];
  private tunisiaArray: Array<string> = ["Tunisia", "Tunisian", "Tunisia's", "Tunisians", "Tunis", "Sfax", "Sousse", "Kairouan", "Carthage", "Beji Caid Essebsi"];
  private libyaArray: Array<string> = ["Libya", "Libyan", "Libya's", "Libyans", "Tripoli", "Benghazi", "Khoms", "Muammar Gaddafi", "Fayez al-Sarraj", "Magariaf"];
  private egyptArray: Array<string> = ["Egypt", "Egyptian", "Cairo", "Egypt's", "Egyptian's", "Abdel Fattah el-Sisi"];
  private westernSaharaArray: Array<string> = ["Western Sahara", "Western Sahara's", "Western Sahara's", "Western Saharans", "Cape Bojador", "Bir Gandus", "Lemseid", "Haouza", "Umm Dreiga", "El-Aaiún"];
  private mauritaniaArray: Array<string> = ["Mauritania", "Mauritania's", "Mauritanian", "Mauritanians", "Nouakchott", "Nouadhibou", "Ould Abdel Aziz", "Yahya Ould Hademine"];
  private maliArray: Array<string> = ["Mali", "Mali's", "Malian", "Republic of Mali", "Malians", "Bamako", "Ibrahim Boubacar Keïta", "Timbuktu", "Djenné"];
  private nigerArray: Array<string> = ["Niger", "Niger's", "Republic of Niger", "Niamey", "Mahamadou Issoufou"];
  private chadArray: Array<string> = ["Chad", "Chad's", "N'Djamena", "Idriss Déby"];
  private sudanArray: Array<string> = ["Sudan", "Sudan's", "Sudanese", "Khartoum", "Omar al-Bashir", "Port Sudan"];
  private senegalArray: Array<string> = ["Senegal", "Senegal's", "Senegalese", "Dakar", "Touba", "Macky Sall"];
  private gambiaArray: Array<string> = ["Gambia", "Gambia's", "Gambian", "Gambians", "Banjul", "Adama Barrow"];
  private guineaBassauArray: Array<string> = ["Guinea-Bissau", "Guinea-Bissau's", "Guinea Bissau", "Bissau", "José Mário Vaz"];
  private guineaArray: Array<string> = ["Guinea", "Conakry", "Alpha Condé", "Guinean"];
  private sierraLeoneArray: Array<string> = ["Sierra Leone", "Sierra Leone's", "Freetown", "Ernest Bai Koroma", "Makeni", "Koidu"];
  private liberiaArray: Array<string> = ["Liberia", "Liberian", "Liberians", "Liberia's", "Monrovia", "Ellen Johnson Sirleaf"];
  private ivoryCoastArray: Array<string> = ["Côte d’Ivoire", "Ivory Coast", "Yamoussoukro", "Alassane Ouattara"];
  private burkinaFasoArray: Array<string> = ["Ouagadougou", "Burkina Faso", "Roch Marc Christian Kaboré"];
  private ghanaArray: Array<string> = ["Ghana", "Accra", "Nana Akufo-Addo", "Kumasi"];
  private togoArray: Array<string> = ["Togo", "Lomé", "Faure Gnassingbé", "Koutammakou", "Lake Togo"];
  private beninArray: Array<string> = ["Benin", "Porto-Novo", "Patrice Talon", "Pendjari National Park", "Cotonou"];
  private nigeriaArray: Array<string> = ["Nigeria", "Abuja", "Muhammadu Buhari", "Lagos", "Abuja", "Calabar", "Zuma Rock"];
  private cameroonArray: Array<string> = ["Cameroon", "Yaoundé", "Paul Biya", "Douala", "Yaoundé"];
  private centralAfricanRepublicArray: Array<string> = ["Central African Republic", "Bangui", "Faustin-Archange Touadéra"];
  private southSudanArray: Array<string> = ["South Sudan", "South Sudanese", "South Sudan's", "Juba", "Salva Kiir Mayardit"];
  private ethiopiaArray: Array<string> = ["Ethiopia", "Ethiopian", "Ethiopia's", "Ethiopians", "Addis Ababa", "Mulatu Teshome", "Lalibela", "Tedros", "Lake Turkana", "Simien Mountains"];
  private eritreaArray: Array<string> = ["Eritrea", "Eritrea's", "Eritrean", "Eritreans", "Asmara", "Isaias Afwerki", "Massawa", "Keren"];
  private somaliaArray: Array<string> = ["Somalia", "Somalian", "Somalia's", "Somalians", "Mogadishu", "Mohamed Abdullahi Mohamed", "Somali", "Al-Shabaab", "al-Shabaab", "al-shabaab"];
  private equatorialGuineaArray: Array<string> = ["Teodoro Obiang Nguema Mbasogo", "Malabo", "Oyala", "Corisco"];
  private gabonArray: Array<string> = ["Gabon", "Gabon's", "Libreville", "Ali Bongo Ondimba", "Lopé National Park"];
  private republicOfCongoArray: Array<string> = ["Republic of Congo", "Brazzaville", "Denis Sassou Nguesso", "Livingstone Falls", "Dzanga-Sangha Special Reserve"];
  private democraticRepublicOfCongoArray: Array<string> = ["Democratic Republic of Congo", "Joseph Kabila", "Kinshasa"];
  private ugandaArray: Array<string> = ["Uganda", "Uganda's", "Ugandan", "Ugandans", "Kampala", "Yoweri Museveni", "Rwenzori Mountains", "Lake Victoria", "Bwindi Impenetrable National Park", "Ssese Islands"];
  private kenyaArray: Array<string> = ["Kenya", "Kenya's", "Kenyans", "Nairobi", "Maasai Mara", "Amboseli National Park", "Lake Nakuru", "Uhuru Kenyatta", "Great Rift Valley"];
  private angolaArray: Array<string> = ["Angola", "Angola's", "Angolan", "Angolans", "Luanda", "José Eduardo dos Santos"];
  private rwandaArray: Array<string> = ["Rwanda", "Rwanda's", "Rwandan", "Rwandans", "Kigali", "Paul Kagame", "Volcanoes National Park", "Mt. Karisimbi", "Nyungwe National Park"];
  private burundiArray: Array<string> = ["Burundi", "Burundi's", "Pierre Nkurunziza", "Bujumbura", "Lake Tanganyika", "Rusizi National Park", "Kibira National Park"];
  private tanzaniaArray: Array<string> = ["Tanzania", "Tanzania's", "Tanzanian", "Tanzanians", "Dodoma", "John Magufuli", "Mount Kilimanjaro", "Mt. Kilimanjaro", "Ngorongoro Conservation Area", "Serengeti National Park", "Olduvai Gorge", "Lake Victoria", "Lake Nyasa"];
  private zambiaArray: Array<string> = ["Zambia", "Zambia's", "Zambian", "Zambians", "Edgar Lungu", "Victoria Falls", "Lusaka", "Kariba Dam", "Lake Kariba", "Mosi-oa-Tunya"];
  private malawiArray: Array<string> = ["Malawi", "Malawi's", "Malawian", "Malawians", "Lilongwe", "Peter Mutharika", "Lake Malawi", "Lake Malawi National Park", "Lake Chilwa", "Liwonde National Park", "Cape Maclear"];
  private namibiaArray: Array<string> = ["Namibia", "Namibia's", "Namibians", "Windhoek", "Hage Geingob", "Etosha National Park", "Sossusvlei", "Spitzoppe", "Twyfelfontein", "Daan Viljoen Game Reserve"];
  private botswanaArray: Array<string> = ["Botswana", "Botswana's", "Botswanan", "Gaborone", "Ian Khama", "Okavango Delta", "Chobe National Park", "Tsodilo", "Central Kalahari Game Reserve", "Kalahari Desert"];
  private zimbabweArray: Array<string> = ["Zimbabwe", "Zimbabwe's", "Zimbabwean", "Zimbabweans", "Robert Mugabe", "Harare", "Matusadona", "Mana Pools", "Hwange National Park", "Matobo National Park"];
  private mozambiqueArray: Array<string> = ["Mozambique", "Mozambique's", "Maputo", "Tofo", "Quirimbas Archipelago", "Ibo Island", "Bazaruto Archipelago"];
  private southAfricaArray: Array<string> = ["South Africa", "South Africans", "South Africa's", "Nelson Mandela", "Apartheid", "apartheid", "Cape Town", "Pretoria", "Jacob Zuma", "Capetown", "Kruger National Park", "Table Mountain", "Robben Island", "Bloemfontein", "Afrikaans"];
  private lesothoArray: Array<string> = ["Lesotho", "Lesotho's", "Lesothans", "Letsie III of Lesotho", "Maseru", "Mount Qiloane", "Malealea", "Drakensberg", "Thaba Bosiu"];
  private swazilandArray: Array<string> = ["Swaziland", "Swaziland's", "Swazi", "Mbabane", "Lobamba", "Mswati III", "Mlilwane Wildlife Sanctuary", "Hlane Royal National Park", "Mlawula Nature Reserve", "Mbuluzi Game Reserve"];
  private madagascarArray: Array<string> = ["Madagascar", "Madagascar's", "Antananarivo", "Hery Rajaonarimampianina", "Ranomafana National Park", "Isalo National Park", "Ankarafantsika National Park", "Parc Ivoloina", "Avenue of the Baobabs", "Ambohimanga"];
  private comorosArray: Array<string> = ["Comoros", "Moroni", "Grande Comore", "Ngazidja", "Mt. Karthala", "Mount Karthala", "Ancienne Mosquée du Vendredi", "Moheli Marine Park", "Bouenindi"];
  private reunionArray: Array<string> = ["Réunion", "Piton de la Fournaise", "Piton des Neiges", "Saint-Denis"];
  private mauritiusArray: Array<string> = ["Mauritius", "Mauritian", "Mauritians", "Black River Gorges National Park", "Port Louis", "Ameenah Gurib", "Île aux Cerfs", ""];
  private saoTomeArray: Array<string> = ["Sao Tome and Principe", "São Tomé and Príncipe", "Sao Tome and Príncipe", "Sao Tome", "São Tomé", "Lagoa Azul lagoon", "Ôbo Natural Park", "Pico Cão Grande"];
  private capeVerdeArray: Array<string> = ["Cape Verde", "Cape Verde's", "Praia", "Forte Real de São Felipe", "Pico do Fogo", "Buracona"];









  share(event) {

    //Enhanced Search.  If a selected country is in the 'event' array, push words relevant to that country to
    //array that we will compare to API JSON title/description keywords

    //Clear previous matches to update the DOM for latest selection
    this.allMatches.length = 0;
    this.eventRegistryMatchesArray.length = 0;
    this.newsApiMatches.length = 0;


    let allArrayValues = [];  //Stores the country keywords for later mapping


    //If the event array contains a country, push the country's keywords to allArrayValues
    if (event.includes("United States")) {
      allArrayValues.push(this.americanArray);
      console.log("America!");
    }

    if (event.includes("Canada")) {
      allArrayValues.push(this.canadaArray);
      console.log("Canada");
    }

    if (event.includes("Mexico")) {
      allArrayValues.push(this.mexicoArray);
      console.log("Mexico");
    }

    if (event.includes("Brazil")) {
      allArrayValues.push(this.brazilArray);
      console.log("Brazil");
    }

    if (event.includes("Argentina")) {
      allArrayValues.push(this.argentinaArray);
      console.log("Argentina");
    }

    if (event.includes("Colombia")) {
      allArrayValues.push(this.colombiaArray);
      console.log("Colombia");
    }

    if (event.includes("Bolivia")) {
      allArrayValues.push(this.boliviaArray);
      console.log("Bolivia");
    }

    if (event.includes("Peru")) {
      allArrayValues.push(this.peruArray);
      console.log("Peru");
    }

    if (event.includes("Ecuador")) {
      allArrayValues.push(this.ecuadorArray);
      console.log("Ecuador");
    }

    if (event.includes("Venezuela")) {
      allArrayValues.push(this.venezuelaArray);
      console.log("Venezuela");
    }

    if (event.includes("Chile")) {
      allArrayValues.push(this.chileArray);
      console.log("Chile");
    }

    if (event.includes("Paraguay")) {
      allArrayValues.push(this.paraguayArray);
      console.log("Paraguay");
    }

    if (event.includes("Uruguay")) {
      allArrayValues.push(this.uruguayArray);
      console.log("Uruguay");
    }

    if (event.includes("Guyana")) {
      allArrayValues.push(this.guyanaArray);
      console.log("Guyana");
    }

    if (event.includes("French Guiana")) {
      allArrayValues.push(this.frenchGuianaArray);
      console.log("French Guiana");
    }

    if (event.includes("Suriname")) {
      allArrayValues.push(this.surinameArray);
      console.log("Suriname");
    }

    if (event.includes("Cuba")) {
      allArrayValues.push(this.cubaArray);
      console.log("Cuba!");
    }


    if (event.includes("Haiti")) {
      allArrayValues.push(this.haitiArray);
    }

    if (event.includes("Dominican Republic")) {
      allArrayValues.push(this.dominicanRepublicArray);
    }

    if (event.includes("Puerto Rico")) {
      allArrayValues.push(this.puertoRicoArray);
    }

    if (event.includes("Bahamas")) {
      allArrayValues.push(this.bahamasArray);
    }

    if (event.includes("Jamaica")) {
      allArrayValues.push(this.jamaicaArray);
    }

    if (event.includes("Guatemala")) {
      allArrayValues.push(this.guatemalaArray);
    }

    if (event.includes("Belize")) {
      allArrayValues.push(this.belizeArray);
    }

    if (event.includes("El Salvador")) {
      allArrayValues.push(this.elSalvadorArray);
    }

    if (event.includes("Honduras")) {
      allArrayValues.push(this.hondurasArray);
    }

    if (event.includes("Nicaragua")) {
      allArrayValues.push(this.nicaraguaArray);
    }

    if (event.includes("Costa Rica")) {
      allArrayValues.push(this.costaRicaArray);
    }

    if (event.includes("Panama")) {
      allArrayValues.push(this.panamaArray);
    }

    if (event.includes("Russia")) {
      allArrayValues.push(this.russiaArray);
      console.log("Ruskis!");
    }

    if (event.includes("Ukraine")) {
      allArrayValues.push(this.ukraineArray);
      console.log("Ukraine");
    }




    //ASIA
    if (event.includes("China")) {
      allArrayValues.push(this.chinaArray);
      console.log("China");
    }

    if (event.includes("Taiwan")) {
      allArrayValues.push(this.taiwanArray);
      console.log("Taiwan");
    }

    if (event.includes("Indonesia")) {
      allArrayValues.push(this.indonesiaArray);
      console.log("Indonesia");
    }

    if (event.includes("Malaysia")) {
      allArrayValues.push(this.malaysiaArray);
      console.log("Malaysia");
    }

    if (event.includes("Cambodia")) {
      allArrayValues.push(this.cambodiaArray);
      console.log("Cambodia");
    }

    if (event.includes("Vietnam")) {
      allArrayValues.push(this.vietnamArray);
      console.log("Vietnam");
    }

    if (event.includes("Thailand")) {
      allArrayValues.push(this.thailandArray);
      console.log("Thailand");
    }

    if (event.includes("Laos")) {
      allArrayValues.push(this.laosArray);
      console.log("Laos");
    }

    if (event.includes("Myanmar")) {
      allArrayValues.push(this.myanmarArray);
      console.log("Myanmar");
    }

    if (event.includes("Mongolia")) {
      allArrayValues.push(this.mongoliaArray);
      console.log("Mongolia");
    }

    if (event.includes("Nepal")) {
      allArrayValues.push(this.nepalArray);
      console.log("Nepal");
    }

    if (event.includes("India")) {
      allArrayValues.push(this.indiaArray);
      console.log("India");
    }

    if (event.includes("Sri Lanka")) {
      allArrayValues.push(this.sriLankaArray);
    }

    if (event.includes("Bangladesh")) {
      allArrayValues.push(this.bangladeshArray);
    }



    //AFRICA
    if (event.includes("South Africa")) {
      allArrayValues.push(this.southAfricaArray);
      console.log("South Africa");
    }


    if (event.includes("Pakistan")) {
      allArrayValues.push(this.pakistanArray);
      console.log("Pakistan");
    }

    if (event.includes("Afghanistan")) {
      allArrayValues.push(this.afghanistanArray);
      console.log("Afghanistan");
    }

    if (event.includes("Iran")) {
      allArrayValues.push(this.iranArray);
      console.log("Iran");
    }

    if (event.includes("Iraq")) {
      allArrayValues.push(this.iraqArray);
      console.log("Iraq");
    }

    if (event.includes("Jordan")) {
      allArrayValues.push(this.jordanArray);
      console.log("Jordan");
    }

    if (event.includes("Israel")) {
      allArrayValues.push(this.israelArray);
      console.log("Israel");
    }

    if (event.includes("Lebanon")) {
      allArrayValues.push(this.lebanonArray);
      console.log("Lebanon");
    }

    if (event.includes("Yemen")) {
      allArrayValues.push(this.yemenArray);
      console.log("Yemen");
    }

    if (event.includes("Oman")) {
      allArrayValues.push(this.omanArray);
      console.log("Oman");
    }

    if (event.includes("North Korea")) {
      allArrayValues.push(this.northKoreaArray);
      console.log("North Korea");
    }

    if (event.includes("South Korea")) {
      allArrayValues.push(this.southKoreaArray);
      console.log("South Korea");
    }

    if (event.includes("Japan")) {
      allArrayValues.push(this.japanArray);
      console.log("Japan");
    }

    if (event.includes("Philippines")) {
      allArrayValues.push(this.philippinesArray);
      console.log("Philippines!");
    }


    if (event.includes("Georgia")) {
      allArrayValues.push(this.georgiaArray);
    }

    if (event.includes("Armenia")) {
      allArrayValues.push(this.armeniaArray);
    }

    if (event.includes("Azerbaijan")) {
      allArrayValues.push(this.azerbaijanArray);
    }

    if (event.includes("Turkmenistan")) {
      allArrayValues.push(this.turkmenistanArray);
    }

    if (event.includes("Uzbekistan")) {
      allArrayValues.push(this.uzbekistanArray);
    }

    if (event.includes("Tajikistan")) {
      allArrayValues.push(this.tajikistanArray);
    }

    if (event.includes("Kyrgyzstan")) {
      allArrayValues.push(this.kyrgyzstanArray);
    }

    if (event.includes("Kazakhstan")) {
      allArrayValues.push(this.kazakhstanArray);
    }




    if (event.includes("United Kingdom")) {
      allArrayValues.push(this.ukArray);
      console.log("United Kingdom!");
    }

    if (event.includes("Ireland")) {
      allArrayValues.push(this.irelandArray);
      console.log("Ireland");
    }

    if (event.includes("Australia")) {
      allArrayValues.push(this.australiaArray);
      console.log("Australia");
    }

    if (event.includes("Papua New Guinea")) {
      allArrayValues.push(this.papuaNewGuineaArray);
      console.log("Papua New Guinea");
    }


    if (event.includes("New Zealand")) {
      allArrayValues.push(this.newZealandArray);
      console.log("New Zealand");
    }

    if (event.includes("Kiribati")) {
      allArrayValues.push(this.kiribatiArray);
    }

    if (event.includes("French Polynesia")) {
      allArrayValues.push(this.frenchPolynesiaArray);
    }

    if (event.includes("Guam")) {
      allArrayValues.push(this.guamArray);
    }

    if (event.includes("Palau")) {
      allArrayValues.push(this.palauArray);
    }

    if (event.includes("Solomon Islands")) {
      allArrayValues.push(this.solomonIslandsArray);
    }

    if (event.includes("Vanuatu")) {
      allArrayValues.push(this.vanuatuArray);
    }

    if (event.includes("Fiji")) {
      allArrayValues.push(this.fijiArray);
    }

    if (event.includes("Samoa")) {
      allArrayValues.push(this.samoaArray);
    }

    if (event.includes("Tonga")) {
      allArrayValues.push(this.tongaArray);
    }

    if (event.includes("Niue")) {
      allArrayValues.push(this.niueArray);
    }

    if (event.includes("New Caledonia")) {
      allArrayValues.push(this.newCaledoniaArray);
    }

    if (event.includes("French Southern and Antarctic Islands")) {
      allArrayValues.push(this.frenchSouthernArray);
    }

    if (event.includes("Heard Island and Mcdonald Islands")) {
      allArrayValues.push(this.heardIslandArray);
    }

    if (event.includes("South Georgia and South Sandwich Islands")) {
      allArrayValues.push(this.southSandwichArray);
    }

    if (event.includes("Bouvet Islands")) {
      allArrayValues.push(this.bouvetIslandArray);
    }

    if (event.includes("Falkland Islands")) {
      allArrayValues.push(this.falklandIslandsArray);
    }

    if (event.includes("Cook Islands")) {
      allArrayValues.push(this.cookIslandsArray);
    }



    if (event.includes("France")) {
      allArrayValues.push(this.franceArray);
      console.log("Frenchies!");
    }

    if (event.includes("Spain")) {
      allArrayValues.push(this.spainArray);
      console.log("Spain");
    }

    if (event.includes("Portugal")) {
      allArrayValues.push(this.portugalArray);
      console.log("Portugal");
    }


    if (event.includes("Germany")) {
      allArrayValues.push(this.germanyArray);
      console.log("Zee Deutschland!");
    }

    if (event.includes("Italy")) {
      allArrayValues.push(this.italyArray);
      console.log("Italy");
    }

    if (event.includes("Netherlands")) {
      allArrayValues.push(this.netherlandsArray);
      console.log("Netherlands");
    }

    if (event.includes("Belgium")) {
      allArrayValues.push(this.belgiumArray);
      console.log("Belgium");
    }

    if (event.includes("Luxembourg")) {
      allArrayValues.push(this.luxembourgArray);
      console.log("Luxembourg");
    }

    if (event.includes("Switzerland")) {
      allArrayValues.push(this.switzerlandArray);
      console.log("Switzerland");
    }

    if (event.includes("Austria")) {
      allArrayValues.push(this.austriaArray);
      console.log("Austria");
    }

    if (event.includes("Slovenia")) {
      allArrayValues.push(this.sloveniaArray);
      console.log("Slovenia");
    }

    if (event.includes("Czech Republic")) {
      allArrayValues.push(this.czechRepublicArray);
      console.log("Czech Republic");
    }

    if (event.includes("Croatia")) {
      allArrayValues.push(this.croatiaArray);
      console.log("Croatia");
    }

    if (event.includes("Bosnia and Herzegovina")) {
      allArrayValues.push(this.bosniaHerzegovinaArray);
      console.log("Bosnia and Herzegovina");
    }

    if (event.includes("Poland")) {
      allArrayValues.push(this.polandArray);
      console.log("Poland");
    }

    if (event.includes("Slovakia")) {
      allArrayValues.push(this.slovakiaArray);
      console.log("Slovakia");
    }

    if (event.includes("Hungary")) {
      allArrayValues.push(this.hungaryArray);
      console.log("Hungary");
    }

    if (event.includes("Serbia")) {
      allArrayValues.push(this.serbiaArray);
      console.log("Serbia");
    }

    if (event.includes("Montenegro")) {
      allArrayValues.push(this.montenegroArray);
      console.log("Montenegro");
    }

    if (event.includes("Kosovo")) {
      allArrayValues.push(this.kosovoArray);
      console.log("Kosovo");
    }

    if (event.includes("Albania")) {
      allArrayValues.push(this.albaniaArray);
      console.log("Albania");
    }

    if (event.includes("Macedonia")) {
      allArrayValues.push(this.macedoniaArray);
      console.log("Macedonia");
    }

    if (event.includes("Greece")) {
      allArrayValues.push(this.greeceArray);
      console.log("Greece");
    }

    if (event.includes("Bulgaria")) {
      allArrayValues.push(this.bulgariaArray);
      console.log("Bulgaria");
    }

    if (event.includes("Romania")) {
      allArrayValues.push(this.romaniaArray);
      console.log("Romania");
    }

    if (event.includes("Moldova")) {
      allArrayValues.push(this.moldovaArray);
      console.log("Moldova");
    }

    if (event.includes("Macedonia")) {
      allArrayValues.push(this.macedoniaArray);
      console.log("Macedonia");
    }

    if (event.includes("Belarus")) {
      allArrayValues.push(this.belarusArray);
      console.log("Belarus");
    }

    if (event.includes("Lithuania")) {
      allArrayValues.push(this.lithuaniaArray);
      console.log("Lithuania");
    }

    if (event.includes("Latvia")) {
      allArrayValues.push(this.latviaArray);
      console.log("Latvia");
    }

    if (event.includes("Estonia")) {
      allArrayValues.push(this.estoniaArray);
      console.log("Estonia");
    }

    if (event.includes("Finland")) {
      allArrayValues.push(this.finlandArray);
      console.log("Finland");
    }

    if (event.includes("Norway")) {
      allArrayValues.push(this.norwayArray);
      console.log("Norway");
    }

    if (event.includes("Sweden")) {
      allArrayValues.push(this.swedenArray);
      console.log("Sweden");
    }

    if (event.includes("Denmark")) {
      allArrayValues.push(this.denmarkArray);
      console.log("Denmark");
    }

    if (event.includes("Iceland")) {
      allArrayValues.push(this.icelandArray);
      console.log("Iceland");
    }

    if (event.includes("Greenland")) {
      allArrayValues.push(this.greenlandArray);
      console.log("Greenland");
    }

    if (event.includes("Faroe Islands")) {
      allArrayValues.push(this.faroeIslandsArray);
      console.log("Faroe Islands");
    }

    if (event.includes("Svalbard and Jan Mayen")) {
      allArrayValues.push(this.svalbardArray);
      console.log("Svalbard");
    }


    if (event.includes("Syria")) {
      allArrayValues.push(this.syriaArray);
      console.log("Syria");
    }

    if (event.includes("Saudi Arabia")) {
      allArrayValues.push(this.saudiArabiaArray);
      console.log("Saudi Arabia");
    }

    if (event.includes("Egypt")) {
      allArrayValues.push(this.egyptArray);
      console.log("Egypt");
    }

    if (event.includes("Turkey")) {
      allArrayValues.push(this.turkeyArray);
    }


//AFRICA

    if (event.includes("Somalia")) {
      allArrayValues.push(this.somaliaArray);
    }

    if (event.includes("Morocco")) {
      allArrayValues.push(this.moroccoArray);
    }

    if (event.includes("Algeria")) {
      allArrayValues.push(this.algeriaArray);
    }

    if (event.includes("Tunisia")) {
      allArrayValues.push(this.tunisiaArray);
    }

    if (event.includes("Libya")) {
      allArrayValues.push(this.libyaArray);
    }

    if (event.includes("Egypt")) {
      allArrayValues.push(this.egyptArray);
    }

    if (event.includes("Western Sahara")) {
      allArrayValues.push(this.westernSaharaArray);
    }

    if (event.includes("Mauritania")) {
      allArrayValues.push(this.mauritaniaArray);
    }

    if (event.includes("Mali")) {
      allArrayValues.push(this.maliArray);
    }

    if (event.includes("Niger")) {
      allArrayValues.push(this.nigerArray);
    }

    if (event.includes("Chad")) {
      allArrayValues.push(this.chadArray);
    }

    if (event.includes("Sudan")) {
      allArrayValues.push(this.sudanArray);
    }

    if (event.includes("Senegal")) {
      allArrayValues.push(this.senegalArray);
    }

    if (event.includes("Gambia")) {
      allArrayValues.push(this.gambiaArray);
    }

    if (event.includes("Guinea Bassau")) {
      allArrayValues.push(this.guineaBassauArray);
    }

    if (event.includes("Guinea")) {
      allArrayValues.push(this.guineaArray);
    }

    if (event.includes("Sierra Leone")) {
      allArrayValues.push(this.sierraLeoneArray);
    }

    if (event.includes("Liberia")) {
      allArrayValues.push(this.liberiaArray);
    }

    if (event.includes("Côte d’Ivoire")) {
      allArrayValues.push(this.ivoryCoastArray);
    }

    if (event.includes("Burkina Faso")) {
      allArrayValues.push(this.burkinaFasoArray);
    }

    if (event.includes("Ghana")) {
      allArrayValues.push(this.ghanaArray);
    }

    if (event.includes("Togo")) {
      allArrayValues.push(this.togoArray);
    }

    if (event.includes("Benin")) {
      allArrayValues.push(this.beninArray);
    }

    if (event.includes("Nigeria")) {
      allArrayValues.push(this.nigeriaArray);
    }

    if (event.includes("Cameroon")) {
      allArrayValues.push(this.cameroonArray);
    }

    if (event.includes("Central African Republic")) {
      allArrayValues.push(this.centralAfricanRepublicArray);
    }

    if (event.includes("South Sudan")) {
      allArrayValues.push(this.southSudanArray);
    }

    if (event.includes("Ethiopia")) {
      allArrayValues.push(this.ethiopiaArray);
    }

    if (event.includes("Eritrea")) {
      allArrayValues.push(this.eritreaArray);
    }

    if (event.includes("Somalia")) {
      allArrayValues.push(this.somaliaArray);
    }

    if (event.includes("Equatorial Guinea")) {
      allArrayValues.push(this.equatorialGuineaArray);
    }

    if (event.includes("Gabon")) {
      allArrayValues.push(this.gabonArray);
    }

    if (event.includes("Republic of Congo")) {
      allArrayValues.push(this.republicOfCongoArray);
    }

    if (event.includes("Democratic Republic of Congo")) {
      allArrayValues.push(this.democraticRepublicOfCongoArray);
    }

    if (event.includes("Uganda")) {
      allArrayValues.push(this.ugandaArray);
    }

    if (event.includes("Kenya")) {
      allArrayValues.push(this.kenyaArray);
    }

    if (event.includes("Angola")) {
      allArrayValues.push(this.angolaArray);
    }

    if (event.includes("Rwanda")) {
      allArrayValues.push(this.rwandaArray);
    }

    if (event.includes("Burundi")) {
      allArrayValues.push(this.burundiArray);
    }

    if (event.includes("Tanzania")) {
      allArrayValues.push(this.tanzaniaArray);
    }

    if (event.includes("Zambia")) {
      allArrayValues.push(this.zambiaArray);
    }

    if (event.includes("Malawi")) {
      allArrayValues.push(this.malawiArray);
    }

    if (event.includes("Namibia")) {
      allArrayValues.push(this.namibiaArray);
    }

    if (event.includes("Botswana")) {
      allArrayValues.push(this.botswanaArray);
    }

    if (event.includes("Zimbabwe")) {
      allArrayValues.push(this.zimbabweArray);
    }

    if (event.includes("Mozambique")) {
      allArrayValues.push(this.mozambiqueArray);
    }

    if (event.includes("South Africa")) {
      allArrayValues.push(this.southAfricaArray);
    }

    if (event.includes("Lesotho")) {
      allArrayValues.push(this.lesothoArray);
    }

    if (event.includes("Swaziland")) {
      allArrayValues.push(this.swazilandArray);
    }

    if (event.includes("Madagascar")) {
      allArrayValues.push(this.madagascarArray);
    }

    if (event.includes("Comoros")) {
      allArrayValues.push(this.comorosArray);
    }

    if (event.includes("Reunion")) {
      allArrayValues.push(this.reunionArray);
    }

    if (event.includes("Mauritius")) {
      allArrayValues.push(this.mauritiusArray);
    }

    if (event.includes("Sao Tome and Principe")) {
      allArrayValues.push(this.saoTomeArray);
    }

    if (event.includes("Cape Verde")) {
      allArrayValues.push(this.capeVerdeArray);
    }




    //Combines NEWS API arrays for easier iteration/mapping
    var combinedArray = this.bbcJSON.articles.concat(this.alJazeeraJSON.articles, this.apJSON.articles, this.googleJSON.articles, this.economistJSON.articles, this.nytJSON.articles, this.wapoJSON.articles, this.cnnJSON.articles, this.newsweekJSON.articles, this.reutersJSON.articles, this.guardianUkJSON.articles, this.guardianAuJSON.articles, this.huffPostJSON.articles, this.wsjJSON.articles);
    // console.log('Combined news article array', combinedArray);


    var combinedEventRegistry = this.eventRegistryBBC.concat(this.eventRegistryGuardian, this.eventRegistryNewswire, this.eventRegistryCNN, this.eventRegistryWAPO, this.eventRegistryReuters, this.eventRegistryNYT, this.eventRegistryEconomist, this.eventRegistryAP, this.eventRegistryWSJ);
    // console.log("Combined Event Registry Articles Array", combinedEventRegistry);


    //SEARCHING EventRegistry NEWS DESCRIPTIONS FOR SELECTED COUNTRY KEYWORD, RETURN RESULT
    let eventRegistryTitles = _.map(combinedEventRegistry, 'title');
    // console.log("Seeing if ER title mapping works", eventRegistryTitles);
    let eventRegistryResult = event.map(function(word) {
      return eventRegistryTitles.filter(function(article) {
        return article.toString().indexOf(word) > -1;
      });
    });


    // console.log("Mapped Event Registry Result", eventRegistryResult);


    //Event Registry Api
    //RETURNS ARTICLES MENTIONING AT LEAST 2 COUNTRIES, USING THEIR SEMANTICALLY EQUIVALENT KEYWORDS

    //Remove duplicate titles
    var eventRegistryFiltered = eventRegistryTitles.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    })

    // console.log("duplicate array", eventRegistryTitles);
    // console.log("removed duplicates array", eventRegistryFiltered);


    const eventRegistryMatches = eventRegistryFiltered.filter(
      article => allArrayValues.every(
        words => words.find(
          word => article.toString().includes(word)
        )
      )
    );

    // console.log("Articles mentioning at least two countries from EventRegistry JSON", eventRegistryMatches);


    //Iterating over the ARTICLE TITLES to see if they have country name from selected countries
    var newArray = _.map(combinedArray, 'description');
    console.log("Combined News API descriptions", newArray);
    let result =  event.map(function(word){
    	return newArray.filter(function(article){
        // console.log(article);
        if (!article) {
          return false;
        } else {
      	return article.toString().indexOf(word) > -1;
      }
      });
    });


//BING BING BING BING BING
    // let combinedBing = this.bingWorldJSON.value.concat(this.bingPoliticsJSON.value);



    //SEARCHING BING NEWS DESCRIPTIONS FOR SELECTED COUNTRY KEYWORD, RETURN RESULT
    // let bingArray = _.pick(_.find('description', 'title', 'url'));
    // let bingArray = _.map(combinedBing, 'description');
    // let bingResult = event.map(function(word) {
    //   return bingArray.filter(function(article) {
    //     // console.log(article);
    //     return article.toString().indexOf(word) > -1;
    //   });
    // });


    //Bing Api
    // //RETURNS ARTICLES MENTIONING AT LEAST 2 COUNTRIES, USING THEIR SEMANTICALLY EQUIVALENT KEYWORDS
    // const bingMatches = bingArray.filter(
    //   article => allArrayValues.every(
    //     words => words.find(
    //       word => article.toString().includes(word)
    //     )
    //   )
    // );


    //News Api
    var newArray = _.map(combinedArray, 'title');
    // console.log("Combined News API descriptions", newArray);
    const newsApiMatches = newArray.filter(
      article => allArrayValues.every(
        words => words.find(
          word => article.toString().includes(word)
        )
      )
    );

    // Combine Articles of News API and Bing
    // var allNews = newArray.concat(bingArray);
    // var allNews = newArray;
    // console.log('Combined NEWS API and BING titles/descriptions', allNews);


    // console.log('articles with mentioning at least 2 countries from News API:');
    // console.log(newsApiMatches);

    // const combinedMatches = bingMatches.concat(newsApiMatches);
    const combinedMatches = newsApiMatches;
    // console.log("Combined Matches from Bing and News Api: ", combinedMatches);


    for (let article of combinedEventRegistry) {
      for (let match of eventRegistryMatches) {
        if (article.title == match) {
          var eventRegistryObject = { title: article.title, description: article.body, url: article.url, image: article.image, source: article.source.title, thumbnail: article.source.details.thumbImage, date: article.date };
          //Push article objects to global array
          this.eventRegistryMatchesArray.push(eventRegistryObject);

          // console.log("Article url: ", article.url, 'Article title: ', article.title);
        }
      }
    }
    // console.log("Seeing if ER articles are pushing", this.eventRegistryMatchesArray);

    for (let article of combinedArray) {
      for (let match of combinedMatches) {
        if (article.title == match) {
          var articleObject = { title: article.title, description: article.description, url: article.url, image: article.urlToImage, date: article.publishedAt };
          //Push article objects to global array
          this.newsApiMatches.push(articleObject);
          console.log("Article url: ", article.url, 'Article title: ', article.title);
        }
      }
    }
    // console.log("Seeing if articles are pushing", this.newsApiMatches);



    // for (let article of combinedBing) {
    //   for (let match of combinedMatches) {
    //     if (article.description == match) {
    //       var bingArticleObject = { title: article.name, description: article.description, url: article.url, image: article.image.thumbnail.contentUrl, source: article.provider[0].name, date: article.datePublished };
    //       //Push article objects to global array
    //       this.bingApiMatches.push(bingArticleObject);
    //       // console.log("Article url: ", article.url, "Article description: ", article.description);
    //     }
    //   }
    //
    // }
    // console.log("Seeing if Bing matches are pushing", this.bingApiMatches);



    //COMBINE ALL MATCHED ARTICLES, FROM ALL APIS
    this.allMatches = this.eventRegistryMatchesArray.concat(this.newsApiMatches);
    // console.log("NEWS API MATCHES", this.newsApiMatches);
    // console.log("All matches", this.allMatches);

    this.filteredMatches = __.uniqBy(this.allMatches, 'description');
    // console.log("Lodash array with zero duplicates", this.filteredMatches);

    this.doubleFilteredMatches = __.uniqBy(this.filteredMatches, 'title');
    // console.log("Lodash double filtered matches", this.doubleFilteredMatches);



  }



  constructor(
    private ngZone: NgZone,
    private http: Http,
    private router: Router,
    private newsAPI: NewsApiService,

  ) { }



  ngOnInit() {

    //NEWS APIS

    // Return current news from Event Registry BBC
    this.newsAPI.getEventRegistryBBC()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.eventRegistryBBC = res;
          console.log("BBC - The Event Registry", this.eventRegistryBBC);
        });
      });

      // Return current news from Event Registry PR Newswire
    // this.newsAPI.getEventRegistryNewswire()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryNewswire = res;
    //     console.log("PR Newswire - The Event Registry", this.eventRegistryNewswire);
    //   });
    // });


    //Return current news from Event Registry Guardian
    // this.newsAPI.getEventRegistryGuardian()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryGuardian = res;
    //     console.log("The Guardian - Event Registry", this.eventRegistryGuardian);
    //   });
    // });
    //
    // Return current news from Event Registry CNN International
    this.newsAPI.getEventRegistryCNN()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.eventRegistryCNN = res;
          console.log("CNN International - Event Registry", this.eventRegistryCNN);
        });
      });

    //Return current news from Event Registry Washington Post
    // this.newsAPI.getEventRegistryWAPO()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryWAPO = res;
    //     console.log("Washington Post - Event Registry", this.eventRegistryWAPO);
    //   });
    // });

    // Return current news from Event Registry Reuters
    this.newsAPI.getEventRegistryReuters()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.eventRegistryReuters = res;
          console.log("Reuters - Event Registry", this.eventRegistryReuters);
        });
      });
    //
    // Return current news from Event Registry New York Times
    // this.newsAPI.getEventRegistryNYT()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryNYT = res;
    //     console.log("NYT - Event Registry", this.eventRegistryNYT);
    //   });
    // });

    // Return current news from Event Registry Economist
    // this.newsAPI.getEventRegistryEconomist()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryEconomist = res;
    //     console.log("Economist - Event Registry", this.eventRegistryEconomist);
    //   });
    // });

    // Return current news from Event Registry Associated Press
    this.newsAPI.getEventRegistryAP()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.eventRegistryAP = res;
          console.log("Associated Press - Event Registry", this.eventRegistryAP);
        });
      });

    // //Return current news from Event Registry Wall Street Journal
    // this.newsAPI.getEventRegistryWSJ()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryWSJ = res;
    //     console.log("Wall Street Journal - Event Registry", this.eventRegistryWSJ);
    //   });
    // });




    //Get the top 10 Headlines for BBC
    this.newsAPI.getBBC()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.bbcJSON = res;
          console.log('BBC', this.bbcJSON.articles);  //show top 10 articles from BBC Json
        });
      });

    //Get the top 10 Headlines for Associated Press
    this.newsAPI.getAP()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.apJSON = res;
          console.log('Associated Press', this.apJSON.articles);  //show top 10 articles from Associated Press
        });
      });

    //Get the top 10 Headlines for Google News
    this.newsAPI.getGoogle()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.googleJSON = res;
          console.log('Google News', this.googleJSON.articles);  //show top 10 articles from Google News
        });
      });

    //Get the top 10 Headlines for the Economist
    this.newsAPI.getEconomist()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.economistJSON = res;
          console.log('Economist', this.economistJSON.articles);  //show top 10 articles from Economist
        });
      });

    //Get the top 10 Headlines for the New York Times
    this.newsAPI.getNYT()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.nytJSON = res;
          console.log('The New York Times', this.nytJSON.articles);  //show top 10 articles from NYT
        });
      });

    //Get the top 10 Headlines for The Washington Post
    this.newsAPI.getWAPO()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.wapoJSON = res;
          console.log('Washington Post', this.wapoJSON.articles);  //show top 10 articles from WAPO
        });
      });

    //Get the top 10 Headlines for CNN
    this.newsAPI.getCNN()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.cnnJSON = res;
          console.log('CNN', this.cnnJSON.articles);  //show top 10 articles from CNN
        });
      });

    //Get the top 10 Headlines for Newsweek
    this.newsAPI.getNEWSWEEK()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.newsweekJSON = res;
          console.log('Newsweek', this.newsweekJSON.articles);  //show top 10 articles from Newsweek
        });
      });


    //Get the top 10 Headlines for Reuters
    this.newsAPI.getREUTERS()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.reutersJSON = res;
          console.log('Reuters', this.reutersJSON.articles);  //show top 10 articles from Reuters
        });
      });

    //Get the top 10 Headlines for The Guardian UK
    this.newsAPI.getGuardianUK()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.guardianUkJSON = res;
          console.log('Guardian UK', this.guardianUkJSON.articles);  //show top 10 articles from GuardianUK
        });
      });

    //Get the top 10 Headlines for The Guardian AU
    this.newsAPI.getGuardianAU()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.guardianAuJSON = res;
          console.log('Guardian AU', this.guardianAuJSON.articles);  //show top 10 articles from GuardianAU
        });
      });

    //Get the top 10 Headlines for HuffPost
    this.newsAPI.getHuffPost()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.huffPostJSON = res;
          console.log('Huffington Post', this.huffPostJSON.articles);  //show top 10 articles from HuffPost
        });
      });

    //Get the top 10 Headlines for Wall Street Journal
    this.newsAPI.getWSJ()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.wsjJSON = res;
          console.log('Wall Street Journal', this.wsjJSON.articles);  //show top 10 articles from HuffPost
        });
      });

    //Get the top 10 Headlines for Al Jazeera
    this.newsAPI.getAlJazeera()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.alJazeeraJSON = res;
          console.log('Al Jazeera', this.alJazeeraJSON.articles);  //show top 10 articles from Al Jazeera
        });
      });



    // Get World News from Bing News Search
    this.newsAPI.getBingWorldNews()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.bingWorldJSON = res;
          console.log('Bing World News', this.bingWorldJSON.value);
        });
      });

    //Get Politics News from Bing News Search
    this.newsAPI.getBingPoliticsNews()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
          this.bingPoliticsJSON = res;
          console.log('Bing Politics News', this.bingPoliticsJSON.value);
        });
      });


  }
}
