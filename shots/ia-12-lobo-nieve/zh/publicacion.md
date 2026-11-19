标题: AI没看狼，它看的是雪🐺❄️

正文:
这个AI没认出狼：它看的是雪。而且是故意的。🐺❄️
2016年，华盛顿大学的 Marco Tulio Ribeiro、Sameer Singh 和 Carlos Guestrin 故意训练了一个“坏”分类器：用手选的20张照片，狼的背景全是雪，哈士奇的背景都没有雪。结果它只要看到雪就说“狼”，不管动物长什么样。他们想看看人能不能发现。看解释之前，27名学过机器学习的研究生中有10人信任它；看到它用的是照片哪些区域（LIME方法）后，25人提到了雪，只有3人还信任它。这叫“捷径学习”。
没人故意设捷径时也会发生。2018年，Zech 等人测试了在美国3个医院系统（NIH、Mount Sinai、Indiana）的胸部X光片上找肺炎的网络：Mount Sinai 有34.2%的片子有肺炎，NIH 只有1.2%。一个网络能认出片子来自哪家医院：NIH 99.95%、Mount Sinai 99.98%、Indiana 95.6%，连技师放在角落的金属标记都会用上。
2019年，德国海德堡大学的 Winkler 等人发现：皮肤上有手术标记墨水（龙胆紫）时，一款识别黑色素瘤的网络特异度从84.1%降到45.8%，一半以上有墨水的良性痣被判成黑色素瘤；把墨水裁掉后升到97.2%。
所以医疗AI要用别的医院的数据来测试，不然它可能看的是“雪”。
示意图。
来源：Ribeiro, Singh & Guestrin, KDD 2016 · Zech et al., PLOS Medicine 15(11): e1002683 (2018) · Winkler et al., JAMA Dermatology 155(10): 1135–1141 (2019) · Geirhos et al., Nature Machine Intelligence 2: 665–673 (2020)
你觉得AI还可能学会哪些“作弊捷径”？👇
我是 Robert，来自 La Creación del Robert 🌱

话题: #人工智能 #AI #机器学习 #医疗AI #科普
