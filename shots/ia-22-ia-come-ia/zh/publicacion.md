标题: AI吃AI，最后只会说野兔🐇

正文:
这个AI并不是迷上了野兔：它是用AI文本训练出来的第9代AI。🐇
2024年，Ilia Shumailov、Zakhar Shumaylov、Yiren Zhao、Nicolas Papernot、Ross Anderson 和 Yarin Gal（牛津、剑桥、伦敦帝国理工、多伦多和爱丁堡）在《Nature》发表研究：如果一个模型一代又一代地用另一个模型写的东西来训练，会发生什么？他们拿了一个小型语言模型（Meta 的 OPT-125m），用 wikitext2 文本集微调，然后每一代新模型都用上一代生成的文本训练。
每一代都被要求续写同一段关于垂直式风格教堂塔楼的文字。第1代就已经跳到“罗马的圣彼得大教堂或布宜诺斯艾利斯的圣彼得大教堂”；第5代开始背一串语言名；第9代写的是“黑尾野兔、白尾野兔、蓝尾野兔、红尾野兔、黄尾……”（译自英文）。
这叫“模型崩溃”：先是分布的尾部、也就是罕见的内容消失，因为它们几乎不会出现在样本里；接着出现原始模型绝不会产生的“遗传错误”。作者警告：网上大规模发布AI生成的文本，会污染下一代模型的训练数据。
公平地说：Gerstgrasser 等人（斯坦福等机构，2024年）发现，如果不替换真实数据，而是把它和新数据一起累积，就能避免崩溃。《Nature》这项研究本身也发现，保留10%的原始数据，退化就很轻微。
示意图；复印件只是类比，不属于研究内容。
来源：Shumailov et al., AI models collapse when trained on recursively generated data, Nature 631: 755–759 (2024) · Gerstgrasser et al. (2024), Is Model Collapse Inevitable?, arXiv:2404.01413
你在网上已经能察觉出像是AI写的文字了吗？👇
我是 Robert，来自 La Creación del Robert 🌱

话题: #人工智能 #大模型 #模型崩溃 #AI生成内容 #科普
