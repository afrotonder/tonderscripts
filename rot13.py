# scripted by:  omar rosado ramirez
# description:  this script is a simple rot13 decoder.
# how to use:   run  python rot13.py <path_to_file_with_cypher>


import sys
# dictionary versions of scii lists
# asciiDict_num =  {i: chr(i) for i in range(48,57)}
# asciiDict_lower = {i: chr(i) for i in range(97,123)}
# asciiDict_upper = {i: chr(i) for i in range(65,91)}
numlist = ['0','1','2','3','4','5','6','7','8','9']
asciiDict_lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
asciiDict_upper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

file = sys.argv[1]
res = ""

with open(file) as f:
    while(True):
        c = f.read(1)
        if  c == '\n':
            print res,'\n'
            print "EOF"
            break
        if c in numlist or c == ' ':
            res += c
            continue
        else:
            if( ord(c)<97 ):
                val = asciiDict_upper.index(c)
                v = (val-13)%26
                res += asciiDict_upper[v]
            else:
                val = asciiDict_lower.index(c)
                v = (val-13)%26
                res += asciiDict_lower[v]
