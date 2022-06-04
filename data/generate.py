import os
from os.path import exists
import json
import requests
import wget
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("TOKEN")

if not exists("queue"):
    os.makedirs("queue")

# extracted from http//www.naturalearthdata.com/download/110m/cultural/ne_110m_admin_0_countries.zip
# under public domain terms
country_bounding_boxes = [
    #('Afghanistan', (60.5284298033, 29.318572496, 75.1580277851, 38.4862816432)),
    #('Angola', (11.6400960629, -17.9306364885, 24.0799052263, -4.43802336998)),
    #('Albania', (19.3044861183, 39.624997667, 21.0200403175, 42.6882473822)),
    #('United Arab Emirates', (51.5795186705, 22.4969475367, 56.3968473651, 26.055464179)),
    #('Argentina', (-73.4154357571, -55.25, -53.628348965, -21.8323104794)),
    #('Armenia', (43.5827458026, 38.7412014837, 46.5057198423, 41.2481285671)),
    ('Antarctica', (-180.0, -90.0, 180.0, -63.2706604895)),
    ('Australia', (113.338953078, -43.6345972634, 153.569469029, -10.6681857235)),
    ('Austria', (9.47996951665, 46.4318173285, 16.9796667823, 49.0390742051)),
    ('Belgium', (2.51357303225, 49.5294835476, 6.15665815596, 51.4750237087)),
    #('Bangladesh', (88.0844222351, 20.670883287, 92.6727209818, 26.4465255803)),
    ('Bulgaria', (22.3805257504, 41.2344859889, 28.5580814959, 44.2349230007)),
    ('Bosnia and Herz.', (15.7500260759, 42.65, 19.59976, 45.2337767604)),
    #('Belarus', (23.1994938494, 51.3195034857, 32.6936430193, 56.1691299506)),
    #('Bolivia', (-69.5904237535, -22.8729187965, -57.4983711412, -9.76198780685)),
    #('Brazil', (-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569)),
    #('Bhutan', (88.8142484883, 26.7194029811, 92.1037117859, 28.2964385035)),
    #('Botswana', (19.8954577979, -26.8285429827, 29.4321883481, -17.6618156877)),
    # ('Central African Rep.', (14.4594071794,
    # 2.2676396753, 27.3742261085, 11.1423951278)),
    ('Canada', (-140.99778, 41.6751050889, -52.6480987209, 83.23324)),
    ('Switzerland', (6.02260949059, 45.7769477403, 10.4427014502, 47.8308275417)),
    #('Chile', (-75.6443953112, -55.61183, -66.95992, -17.5800118954)),
    #('China', (73.6753792663, 18.197700914, 135.026311477, 53.4588044297)),
    #('Colombia', (-78.9909352282, -4.29818694419, -66.8763258531, 12.4373031682)),
    #('Costa Rica', (-85.94172543, 8.22502798099, -82.5461962552, 11.2171192489)),
    #('Cuba', (-84.9749110583, 19.8554808619, -74.1780248685, 23.1886107447)),
    #('Cyprus', (32.2566671079, 34.5718694118, 34.0048808123, 35.1731247015)),
    ('Czech Rep.', (12.2401111182, 48.5553052842, 18.8531441586, 51.1172677679)),
    ('Germany', (5.98865807458, 47.3024876979, 15.0169958839, 54.983104153)),
    ('Denmark', (8.08997684086, 54.8000145534, 12.6900061378, 57.730016588)),
    #('Egypt', (24.70007, 22.0, 36.86623, 31.58568)),
    ('Spain', (-9.39288367353, 35.946850084, 3.03948408368, 43.7483377142)),
    ('Estonia', (23.3397953631, 57.4745283067, 28.1316992531, 59.6110903998)),
    ('Finland', (20.6455928891, 59.846373196, 31.5160921567, 70.1641930203)),
    ('France', (-54.5247541978, 2.05338918702, 9.56001631027, 51.1485061713)),
    ('United Kingdom', (-7.57216793459, 49.959999905, 1.68153079591, 58.6350001085)),
    #('Georgia', (39.9550085793, 41.0644446885, 46.6379081561, 43.553104153)),
    #('Ghana', (-3.24437008301, 4.71046214438, 1.0601216976, 11.0983409693)),
    ('Greece', (20.1500159034, 34.9199876979, 26.6041955909, 41.8269046087)),
    #('Greenland', (-73.297, 60.03676, -12.20855, 83.64513)),
    #('Guatemala', (-92.2292486234, 13.7353376327, -88.2250227526, 17.8193260767)),
    #('Honduras', (-89.3533259753, 12.9846857772, -83.147219001, 16.0054057886)),
    ('Croatia', (13.6569755388, 42.47999136, 19.3904757016, 46.5037509222)),
    #('Haiti', (-74.4580336168, 18.0309927434, -71.6248732164, 19.9156839055)),
    ('Hungary', (16.2022982113, 45.7594811061, 22.710531447, 48.6238540716)),
    #('Indonesia', (95.2930261576, -10.3599874813, 141.03385176, 5.47982086834)),
    #('India', (68.1766451354, 7.96553477623, 97.4025614766, 35.4940095078)),
    ('Ireland', (-9.97708574059, 51.6693012559, -6.03298539878, 55.1316222195)),
    #('Iran', (44.1092252948, 25.0782370061, 63.3166317076, 39.7130026312)),
    #('Iraq', (38.7923405291, 29.0990251735, 48.5679712258, 37.3852635768)),
    ('Iceland', (-24.3261840479, 63.4963829617, -13.609732225, 66.5267923041)),
    #('Israel', (34.2654333839, 29.5013261988, 35.8363969256, 33.2774264593)),
    ('Italy', (6.7499552751, 36.619987291, 18.4802470232, 47.1153931748)),
    #('Jamaica', (-78.3377192858, 17.7011162379, -76.1996585761, 18.5242184514)),
    ('Japan', (129.408463169, 31.0295791692, 145.543137242, 45.5514834662)),
    #('Kazakhstan', (46.4664457538, 40.6623245306, 87.3599703308, 55.3852501491)),
    #('Kenya', (33.8935689697, -4.67677, 41.8550830926, 5.506)),
    #('Kyrgyzstan', (69.464886916, 39.2794632025, 80.2599902689, 43.2983393418)),
    #('Cambodia', (102.3480994, 10.4865436874, 107.614547968, 14.5705838078)),
    ('S. Korea', (126.117397903, 34.3900458847, 129.468304478, 38.6122429469)),
    #('Laos', (100.115987583, 13.88109101, 107.564525181, 22.4647531194)),
    #('Lebanon', (35.1260526873, 33.0890400254, 36.6117501157, 34.6449140488)),
    #('Libya', (9.31941084152, 19.58047, 25.16482, 33.1369957545)),
    #('Sri Lanka', (79.6951668639, 5.96836985923, 81.7879590189, 9.82407766361)),
    #('Lesotho', (26.9992619158, -30.6451058896, 29.3251664568, -28.6475017229)),
    ('Lithuania', (21.0558004086, 53.9057022162, 26.5882792498, 56.3725283881)),
    ('Luxembourg', (5.67405195478, 49.4426671413, 6.24275109216, 50.1280516628)),
    ('Latvia', (21.0558004086, 55.61510692, 28.1767094256, 57.9701569688)),
    #('Morocco', (-17.0204284327, 21.4207341578, -1.12455115397, 35.7599881048)),
    #('Moldova', (26.6193367856, 45.4882831895, 30.0246586443, 48.4671194525)),
    #('Madagascar', (43.2541870461, -25.6014344215, 50.4765368996, -12.0405567359)),
    #('Mexico', (-117.12776, 14.5388286402, -86.811982388, 32.72083)),
    #('Macedonia', (20.46315, 40.8427269557, 22.9523771502, 42.3202595078)),
    #('Myanmar', (92.3032344909, 9.93295990645, 101.180005324, 28.335945136)),
    #('Montenegro', (18.45, 41.87755, 20.3398, 43.52384)),
    #('Mongolia', (87.7512642761, 41.5974095729, 119.772823928, 52.0473660345)),
    #('Mozambique', (30.1794812355, -26.7421916643, 40.7754752948, -10.3170960425)),
    #('Malaysia', (100.085756871, 0.773131415201, 119.181903925, 6.92805288332)),
    #('Namibia', (11.7341988461, -29.045461928, 25.0844433937, -16.9413428687)),
    #('Nigeria', (2.69170169436, 4.24059418377, 14.5771777686, 13.8659239771)),
    ('Netherlands', (3.31497114423, 50.803721015, 7.09205325687, 53.5104033474)),
    ('Norway', (4.99207807783, 58.0788841824, 31.29341841, 80.6571442736)),
    #('Nepal', (80.0884245137, 26.3978980576, 88.1748043151, 30.4227169866)),
    ('New Zealand', (166.509144322, -46.641235447, 178.517093541, -34.4506617165)),
    #('Pakistan', (60.8742484882, 23.6919650335, 77.8374507995, 37.1330309108)),
    #('Panama', (-82.9657830472, 7.2205414901, -77.2425664944, 9.61161001224)),
    #('Peru', (-81.4109425524, -18.3479753557, -68.6650797187, -0.0572054988649)),
    #('Philippines', (117.17427453, 5.58100332277, 126.537423944, 18.5052273625)),
    #('Papua New Guinea', (141.000210403, -10.6524760881, 156.019965448, -2.50000212973)),
    ('Poland', (14.0745211117, 49.0273953314, 24.0299857927, 54.8515359564)),
    #('Puerto Rico', (-67.2424275377, 17.946553453, -65.5910037909, 18.5206011011)),
    ('N. Korea', (124.265624628, 37.669070543, 130.780007359, 42.9853868678)),
    ('Portugal', (-9.52657060387, 36.838268541, -6.3890876937, 42.280468655)),
    #('Paraguay', (-62.6850571357, -27.5484990374, -54.2929595608, -19.3427466773)),
    #('Qatar', (50.7439107603, 24.5563308782, 51.6067004738, 26.1145820175)),
    ('Romania', (20.2201924985, 43.6884447292, 29.62654341, 48.2208812526)),
    ('Russia', (-180.0, 41.151416124, 180.0, 81.2504)),
    #('Rwanda', (29.0249263852, -2.91785776125, 30.8161348813, -1.13465911215)),
    #('Saudi Arabia', (34.6323360532, 16.3478913436, 55.6666593769, 32.161008816)),
    #('Sudan', (21.93681, 8.61972971293, 38.4100899595, 22.0)),
    #('Senegal', (-17.6250426905, 12.332089952, -11.4678991358, 16.5982636581)),
    #('Somalia', (40.98105, -1.68325, 51.13387, 12.02464)),
    ('Serbia', (18.82982, 42.2452243971, 22.9860185076, 46.1717298447)),
    ('Slovakia', (16.8799829444, 47.7584288601, 22.5581376482, 49.5715740017)),
    #('Slovenia', (13.6981099789, 45.4523163926, 16.5648083839, 46.8523859727)),
    ('Sweden', (11.0273686052, 55.3617373725, 23.9033785336, 69.1062472602)),
    #('Swaziland', (30.6766085141, -27.2858794085, 32.0716654803, -25.660190525)),
    #('Syria', (35.7007979673, 32.312937527, 42.3495910988, 37.2298725449)),
    #('Thailand', (97.3758964376, 5.69138418215, 105.589038527, 20.4178496363)),
    #('Turkmenistan', (52.5024597512, 35.2706639674, 66.5461503437, 42.7515510117)),
    #('Tunisia', (7.52448164229, 30.3075560572, 11.4887874691, 37.3499944118)),
    #('Turkey', (26.0433512713, 35.8215347357, 44.7939896991, 42.1414848903)),
    #('Taiwan', (120.106188593, 21.9705713974, 121.951243931, 25.2954588893)),
    #('Tanzania', (29.3399975929, -11.7209380022, 40.31659, -0.95)),
    #('Uganda', (29.5794661801, -1.44332244223, 35.03599, 4.24988494736)),
    #('Ukraine', (22.0856083513, 44.3614785833, 40.0807890155, 52.3350745713)),
    #('Uruguay', (-58.4270741441, -34.9526465797, -53.209588996, -30.1096863746)),
    ('United States', (-171.791110603, 18.91619, -66.96466, 71.3577635769)),
    #('Venezuela', (-73.3049515449, 0.724452215982, -59.7582848782, 12.1623070337)),
    #('Vietnam', (102.170435826, 8.59975962975, 109.33526981, 23.3520633001)),
    ('South Africa', (16.3449768409, -34.8191663551, 32.830120477, -22.0913127581)),
    #('Zimbabwe', (25.2642257016, -22.2716118303, 32.8498608742, -15.5077869605)),
]

images = {}
for _, bbox in country_bounding_boxes:
    print(bbox)
    images_json = requests.get("https://graph.mapillary.com/images?access_token={}&fields=id&limit=10&bbox={},{},{},{}".format(
        token, bbox[0], bbox[1], bbox[2], bbox[3])).text
    image_ids = [image["id"] for image in json.loads(images_json)["data"]]

    print("Fetched image ids")

    i = 0
    for id in image_ids:
        image_data_json = requests.get(
            "https://graph.mapillary.com/{}?access_token={}&fields=thumb_1024_url,geometry".format(id, token)).text
        image_data = json.loads(image_data_json)
        coordinates = image_data["geometry"]["coordinates"]
        images[id] = {
            "coordinates": coordinates
        }

        try:
            wget.download(image_data["thumb_1024_url"],
                          out="queue/{}.jpeg".format(id))
            print(" Downloaded image", i)
        except:
            print("Error")

        i += 1

with open("images.json", "w") as images_file:
    json.dump(images, images_file)
