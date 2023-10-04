#!/usr/bin/env python3
from sys import stdin, stdout, stderr

from argparse import ArgumentParser
from pathlib import Path

from base64 import b64decode

from Crypto.Protocol.KDF import PBKDF2
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Util.Padding import unpad

DEFAULT_FILE_EXTENSION = '.tmt'

PASSWORDS = {
    '.tut': b'fubvx788b46v',
    '.tmt': b'$$$@mfube11!!_$$))012b4u',
    '.sks': b'dyv35224nossas!!',
    '.temt': b'fubvx788B4mev',
    '.tsn': b'thirdy1996624',
    '.etun': b'dyv35224nossas!!',
    '.pxp': b'bKps&92&',
    '.ace': b'Ed',
    '.tsd': b'waiting',
    '.ost': b'gggggg',
    '.wt': b'fuMnrztkzbQ',
    '.tnl': b'A^ST^f6ASG6AS5asd',
    '.tnl': b'B1m93p$$9pZcL9yBs0b$jJwtPM5VG@Vg',
    '.ziv': b'B1m93p$$9pZcL9yBs0b$jJwtPM5VG@Vg',
    '.fks': b'fubvx788b46v',
    '.gv': b'Ed',
    '.gg': b'Ed',
    '.act': b'fubvx788b46v',
    '.cnet': b'cnt',
    '.gibs': b'Ed',
    '.dvd': b'dyv35224nossas!!',
    '.ftp': b'Version6',
    '.fthp': b'furious0982',
    '.jph': b'fubvx788b46v',
    '.xsks': b'c7-YOcjyk1k',
    '.ht': b'error',
    '.ssi': b'Jicv',
    '.kt': b'kt',
    '.dvs': b'mtscrypt',
    '.fnet': b'62756C6F6B',
    '.mc': b'fubvx788b46v',
    '.hub': b'trfre699g79r',
    '.grd': b'fubvx788b46v',
    '.hta': b'Ed',
    '.eug': b'fubvx788b46v',
    '.sds': b'rdovx202b46v',
    '.htp': b'chanika acid, gimsara htpcag!!',
    '.bbb': b'xcode788b46z',
    '.ccc': b'fubgf777gf6',
    '.ddd': b'fubvx788b46vcatsn',
    '.eee': b'dyv35182!',
    '.cln': b'fubvx788b46v',
    '.cyh': b'dyv35182!',
    '.agn': b'cigfhfghdf665557',
    '.Tcv2': b'fubvx788b46v',
    '.NT': b'0x0',
    '.ai': b'Ed',
    'cks': b'2$dOxdIb6hUpzb*Y@B0Nj!T!E2A6DOLlwQQhs4RO6QpuZVfjGx',
    '.sksrv': b'y$I@no5#lKuR7ZH#eAgORu6QnAF*vP0^JOTyB1ZQ&*w^RqpGkY',
    '.garuda': b'fubvx788b46v',
    '.tpp': b'Ed',
    '.sky': b'fubux788b46v',
    '.skyp': b'\u02bb\u02bd\u1d35\u02c6\u02c8\u02c6\u2071\u02cb.milQP\u05d9\u02d1\ufe73\u2071\uff9e\u02c6\u1d4e\u02bd\u02bc\u02bc\u02c8\u05d9\ufe76\uff9e\u05d9\u1d54\uff9e\u02ceswtIX',
    '.max': b'Ed',
}

# some utility functions
def error(error_msg = 'Corrupted/unsupported file.'):
    stderr.write(f'\033[41m\033[30m X \033[0m {error_msg}\n')
    stderr.flush()
    exit(1)

def main(encrypted_contents, file_ext):
        if file_ext not in PASSWORDS:
            file_ext = DEFAULT_FILE_EXTENSION

        split_base64_contents = encrypted_contents.split('.')

        split_contents = list(map(b64decode, split_base64_contents))

        decryption_key = PBKDF2(PASSWORDS[file_ext], split_contents[0], hmac_hash_module=SHA256)

        cipher = AES.new(decryption_key, AES.MODE_GCM, nonce=split_contents[1])
        decrypted_contents = cipher.decrypt_and_verify(split_contents[2][:-16], split_contents[2][-16:])

        config = decrypted_contents.decode('utf-8','ignore')
        configdict = {}
        for line in config.split('\n'):
            if line.startswith('<entry'):
                line = line.replace('<entry key="','')
                line = line.replace('</entry','')
                line = line.split('">')
                if len(line) >1:
                    configdict[line[0]] = line[1].strip(">")
                else:
                    configdict[line[0].strip('"/>')]= " ***"

        for k,v in configdict.items():
            print(k+": " +v)

        print("sshAddress: "
                + configdict["sshServer"]
                + ":"
                + configdict["sshPort"]
                + "@"
                + configdict["sshUser"]
                + ":"
                + configdict["sshPass"]
        )


try:
    parser = ArgumentParser()
    parser.add_argument('encrypted', help='string to decrypt')
    parser.add_argument('file_ext', help='ext of file')
    args = parser.parse_args()

    main(args.encrypted, args.file_ext)
except Exception as err:
    error(err)
