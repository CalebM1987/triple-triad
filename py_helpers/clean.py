#!/usr/bin/python3
# Created by Silencer @ Stackoverflow 
# 2018.01.23 14:41:42 CST
# 2018.01.23 18:17:42 CST
import cv2
import numpy as np
import os
from PIL import Image

def remove_white_background(src, out_png=None):
    if not out_png:
        out_png = os.path.splitext(src)[0] + '.png'
    # img = cv2.imread(src)

    # ## (1) Convert to gray, and threshold
    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # th, threshed = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    # ## (2) Morph-op to remove noise
    # kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11,11))
    # morphed = cv2.morphologyEx(threshed, cv2.MORPH_CLOSE, kernel)

    # ## (3) Find the max-area contour
    # cnts = cv2.findContours(morphed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
    # cnt = sorted(cnts, key=cv2.contourArea)[-1]

    # ## (4) Crop and save it
    # x,y,w,h = cv2.boundingRect(cnt)
    # dst = img[y:y+h, x:x+w]
    # cv2.imwrite(out_png, dst)
    # https://stackoverflow.com/a/765774/3005089
    img = Image.open(src)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(out_png, "PNG")
    print('created "{}"'.format(os.path.basename(out_png)))

if __name__ == '__main__':
    import glob
    path = r"C:\Users\calebma\Documents\Development\triple-triad\public\img\players\*.jpg"

    for jpg in glob.glob(path):
        remove_white_background(jpg)