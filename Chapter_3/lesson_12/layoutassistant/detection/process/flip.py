import torch
import torchvision
from torch import nn
from d2l import torch as d2l
import matplotlib.pyplot as plt
 
 
d2l.set_figsize()
img = d2l.Image.open('D:/program/yolov5-master/labels/origin/15447317037117236.jpg')
d2l.plt.imshow(img);
 
 
# aug:图片增广的方式
def apply(img, aug, num_rows=2, num_cols=4, scale=1.5):
    Y = [aug(img) for _ in range(num_rows * num_cols)]
    d2l.show_images(Y, num_rows, num_cols, scale=scale)
    plt.show()
 
 
# 左右翻转图像
# apply(img, torchvision.transforms.RandomHorizontalFlip())
 
# 上下翻转图像
# apply(img, torchvision.transforms.RandomVerticalFlip())
 
# 随机裁剪
shape_aug = torchvision.transforms.RandomResizedCrop(
    (200, 200), scale=(0.1, 1), ratio=(0.5, 2))
 
# 随机更改图像的亮度
'''
apply(img, torchvision.transforms.ColorJitter(
    brightness=0.5, contrast=0, saturation=0, hue=0))
'''
 
# 随机更改图像的色调
'''
apply(img, torchvision.transforms.ColorJitter(
    brightness=0, contrast=0, saturation=0, hue=0.5))
'''
 
# 随机更改图像的亮度、对比度、饱和度和色调
color_aug = torchvision.transforms.ColorJitter(
    brightness=0.5, contrast=0.5, saturation=0.5, hue=0.5)
 
# 结合多种图像增广方法
augs = torchvision.transforms.Compose([
    torchvision.transforms.RandomHorizontalFlip(), color_aug, shape_aug])
apply(img, augs)