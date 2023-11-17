import os

# This code is meant to generate TTS audio files, using the Edge-TTS module.
# The file it reads from is formatted as follows:
#
# - Word
#       - Example sentence #1
#       - Example sentence #2
#       - Example sentence #3
#       - Example sentence #4
#
# It will generate files in the following format:
#
# - Word 1 (directory)
#       - Example sentence #1.mp3
#       - Example sentence #2.mp3
#       - Example sentence #3.mp3
#       - Example sentence #4.mp3
# - Word 2 (directory)
#       .
#       .
#       .
#
# The file, originally provided as a .docx file, was duplicated as .txt file for ease of access.
# Additionally, the original file was formatted using Notepad++ to quickly remove the number listings, the letters
# denoting sentence number, as well as apostrophes in words.
#
# For testing purposes, the main function takes in an integer, which is how many of the words the program will run on.

def generate_files(num_words):
    # set cwd
    abspath = os.path.abspath(__file__)
    dname = os.path.dirname(abspath)
    os.chdir(dname)
    print(os.getcwd())

    # set filepaths, make mp3 directory
    f= open("sentences_for_850_words.txt", "r")
    lines = f.readlines()
    os.system("mkdir mp3s")
    os.chdir("mp3s")

    # loop through words, scanning file 5 lines at a time
    # line 0 is the directory name, lines 1-4 are the sentences to be converted to files
    line_count = 0
    while (line_count < num_words * 5):
        try:
            current_line = lines[line_count]
            current_line = current_line[:-1]
            if (line_count % 5 == 0):
                if (line_count != 0): os.chdir("..")
                os.system("mkdir " + current_line.lower())
                os.chdir(current_line)
                current_word = current_line.lower()
                current_word_sentence_count = 0
            else:
                # make file
                # <word>_sentence<#>
                template_command = 'edge-tts --text \"' + current_line + '\" --write-media \"' + current_word + "_sentence" + str(current_word_sentence_count) + '\".mp3'
                print(template_command)
                os.system(template_command)
                current_word_sentence_count += 1
            line_count += 1
        except IndexError:
            break
    f.close()
    print(line_count)
    return

def main():
    num_words = 855
    generate_files(num_words)

main()
