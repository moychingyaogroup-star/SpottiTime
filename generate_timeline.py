html = ""
# row 1: 0am - 2am
html += """<div class="time-slot"><span class="time-label">0:00</span><div class="slot-content"></div></div>\n"""
html += """<div class="time-slot"><span class="time-label">2:00</span><div class="slot-content"></div></div>\n"""
for i in range(3, 24):
    html += f"""<div class="time-slot"><span class="time-label">{i}:00</span><div class="slot-content"></div></div>\n"""

with open("timeline.txt", "w") as f:
    f.write(html)
