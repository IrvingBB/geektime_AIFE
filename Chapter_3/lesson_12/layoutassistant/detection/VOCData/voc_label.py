import xml.etree.ElementTree as ET
import pickle
import os
from os import listdir, getcwd
from os.path import join
import  shutil

sets=[('TrainVal', 'train'), ('TrainVal', 'val'), ('Test', 'test')]

classes = ['op_bar', 'seckill', 'item', 'banner']

def convert(size, box):
    dw = 1./size[0]
    dh = 1./size[1]
    x = (box[0] + box[1])/2.0
    y = (box[2] + box[3])/2.0
    w = box[1] - box[0]
    h = box[3] - box[2]
    x = x*dw
    w = w*dw
    y = y*dh
    h = h*dh
    return (x,y,w,h)

def convert_annotation(year, image_set, image_id):
    in_file = open('VOC%s/Annotations/%s.xml'%(year, image_id))
    out_file = open('VOC%s/labels/%s_%s/%s.txt'%(year, year, image_set, image_id), 'w')
    tree=ET.parse(in_file)
    root = tree.getroot()
    size = root.find('size')
    w = int(size.find('width').text)
    h = int(size.find('height').text)

    for obj in root.iter('object'):
        difficult = obj.find('difficult').text
        cls = obj.find('name').text
        if cls not in classes or int(difficult) == 1:
            continue
        cls_id = classes.index(cls)
        xmlbox = obj.find('bndbox')
        b = (float(xmlbox.find('xmin').text), float(xmlbox.find('xmax').text), float(xmlbox.find('ymin').text), float(xmlbox.find('ymax').text))
        bb = convert((w,h), b)
        out_file.write(str(cls_id) + " " + " ".join([str(a) for a in bb]) + '\n')

def copy_images(year,image_set, image_id):
    in_file = 'VOC%s/JPEGImages/%s.jpg'%(year, image_id)
    out_flie = 'VOC%s/images/%s_%s/%s.jpg'%(year, year, image_set, image_id)
    shutil.copy(in_file, out_flie)

wd = getcwd()

for year, image_set in sets:
    if not os.path.exists('VOC%s/labels/%s_%s'%(year,year, image_set)):
        os.makedirs('VOC%s/labels/%s_%s'%(year,year, image_set))
    if not os.path.exists('VOC%s/images/%s_%s'%(year,year, image_set)):
        os.makedirs('VOC%s/images/%s_%s'%(year,year, image_set))
    image_ids = open('VOC%s/ImageSets/Main/%s.txt'%(year, image_set)).read().strip().split()
    list_file = open('VOC%s/%s_%s.txt'%(year, year, image_set), 'w')
    for image_id in image_ids:
        list_file.write('%s/VOC%s/images/%s_%s/%s.jpg\n'%(wd, year, year, image_set, image_id))
        convert_annotation(year, image_set, image_id)
        copy_images(year, image_set, image_id)

    list_file.close()
