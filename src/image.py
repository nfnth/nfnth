import numpy
from keras.models import Sequential
from keras.layers import Dense, Dropout, FLatten, BatchNormalzation, Activation
from keras.layers.convulational import Conv2D, MaxPooling2D
from keras.constraints import maxnorm
from keras.utils import np_utils

seed = 21
from keras.datasets import cifar10
(x_train, y_train), (x_test, y_test) = cifar10.load_data()
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train = x_train / 255.0
x_test = x_test / 255.0

y_train = np_utils.to_categorically(y_train)
y_test = np_utils.to_categorically(y_test)
class_num = y_test.shape[1]

model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=x_train.shape[1:], padding='same'))
model.add(Activation('relu'))
model.add(Conv2D(32, (3, 3), input_shape=(3, 32, 32), activation='relu', padding='same'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(Conv2D(64, (3, 3), padding='same'))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.2))
model.add(BatchNormalization())
