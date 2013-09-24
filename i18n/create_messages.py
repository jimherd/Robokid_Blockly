#!/usr/bin/python

# Generate .js files defining Blockly core and language messages.
#
# Copyright 2013 Google Inc.
# http://blockly.googlecode.com/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse
import codecs
import os
from common import InputError
from common import read_json_file


def main():
  """Generate .js files defining Blockly core and language messages."""

  # Process command-line arguments.
  parser = argparse.ArgumentParser(description='Convert JSON files to JS.')
  parser.add_argument('--source_lang', default='en',
                      help='ISO 639-1 source language code')
  parser.add_argument('--source_lang_file',
                      default=os.path.join('json', 'en.json'),
                      help='Path to .json file for source language')
  parser.add_argument('--source_synonym_file',
                      default=os.path.join('json', 'synonyms.json'),
                      help='Path to .json file with synonym definitions')
  parser.add_argument('--output_dir', default='js/',
                      help='relative directory for output files')
  parser.add_argument('--key_file', default='keys.json',
                      help='relative path to input keys file')
  parser.add_argument('--min_length', default=30,
                      help='minimum line length (not counting last line)')
  parser.add_argument('--max_length', default=50,
                      help='maximum line length (not guaranteed)')
  parser.add_argument('files', nargs='+', help='input files')
  args = parser.parse_args()
  if not args.output_dir.endswith(os.path.sep):
    args.output_dir += os.path.sep

  # Read in source language .json file, which provides any values missing
  # in target languages' .json files.
  source_defs = read_json_file(os.path.join(os.curdir, args.source_lang_file))
  if '@metadata' in source_defs:
    del source_defs['@metadata']

  # Read in synonyms file, which must be output in every language.
  synonym_defs = read_json_file(os.path.join(
      os.curdir, args.source_synonym_file))
  synonym_text = '\n'.join(['Blockly.Msg.{0} = Blockly.Msg.{1};'.format(
      key, synonym_defs[key]) for key in synonym_defs])

  # Create each output file.
  for arg_file in args.files:
    (_, filename) = os.path.split(arg_file)
    target_lang = filename[:filename.index('.')]
    if target_lang not in ('qqq', 'keys'):
      target_defs = read_json_file(os.path.join(os.curdir, arg_file))

      # Output file.
      outname = os.path.join(os.curdir, args.output_dir, target_lang + '.js')
      with codecs.open(outname, 'w', 'utf-8') as outfile:
        outfile.write(
            """// This file was automatically generated.  Do not modify.

'use strict';

goog.provide('Blockly.Msg.{0}');

goog.require('Blockly.Msg');

""".format(target_lang))
        # For each key in the source language file, output the target value
        # if present; otherwise, output the source language value with a
        # warning comment.
        for key in source_defs:
          if key in target_defs:
            value = target_defs[key]
            comment = ''
            del target_defs[key]
          else:
            value = source_defs[key]
            comment = '  // untranslated'
          value = value.replace('"', '\\"')
          outfile.write(u'Blockly.Msg.{0} = "{1}";{2}\n'.format(
              key, value, comment))

        # Announce any keys defined only for target language.
        if target_defs:
          extra_keys = [key for key in target_defs if key not in synonyms]
          synonym_keys = [key for key in target_defs if key in synonyms]
          if extra_keys:
            print('These extra keys appeared in {0}: {1}'.format(
                filename, ', '.join(extra_keys)))
          if synonym_keys:
            print('These synonym keys appeared in {0}: {1}'.format(
                filename, ', '.join(synonym_keys)))

        outfile.write(synonym_text)

      print('Created {0}.'.format(outname))


if __name__ == '__main__':
  main()
