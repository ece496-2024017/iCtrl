#  Copyright (c) 2024 iCtrl Developers
#  Permission is hereby granted, free of charge, to any person obtaining a copy
#   of this software and associated documentation files (the "Software"), to
#   deal in the Software without restriction, including without limitation the
#   rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
#   sell copies of the Software, and to permit persons to whom the Software is
#   furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in
#   all copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
#   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
#   IN THE SOFTWARE.
import uuid


# uuid1 utilizes the MAC address of the machine
# and the current time to create the uuid
def generate_uuid_one():
    uuid1 = uuid.uuid1()
    print(f'This is uuid1: {uuid1}')


# Generates a UUID using MD5 hashing of a namespace and a name.
def generate_uuid_three():
    uuid3 = uuid.uuid3(uuid.NAMESPACE_DNS, "name")
    print(f'This is uuid3: {uuid3}')


# uuid4 generates a uuid based on random number
def generate_uuid_four():
    uuid4 = uuid.uuid4()
    print(f'This is uuid4: {uuid4}')


# Similar to uuid3, but uses SHA-1 hashing for generating the UUID.
def generate_uuid_five():
    uuid5 = uuid.uuid5(uuid.NAMESPACE_DNS, "name")
    print(f'This is uuid5: {uuid5}')


# ictrl uuid will utilize uuid5, which utilizes SHA-1, better than uuid3 which uses MD5
# with uuid4 being the namespace, and the username being
def generate_ictrl_uuid():
    namespace = uuid.uuid4()
    #name will be replaced by the username
    name = "name"
    ictrl_uuid = uuid.uuid5(namespace, name)
    print(f'This is iCtrl\'s uuid: {ictrl_uuid}')


# https://www.reddit.com/r/learnprogramming/comments/lhdop9/a_uuid_can_have_so_many_combinations_that_uuids/?rdt=41793
# https://towardsdatascience.com/are-uuids-really-unique-57eb80fc2a87
# UUIDs are not truly unique, but are unique enough for practical purposes
if __name__ == '__main__':
    generate_uuid_one()
    generate_uuid_three()
    generate_uuid_four()
    generate_uuid_five()
    generate_ictrl_uuid()
