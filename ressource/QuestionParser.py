from random import *
import json
import re

fileQuestion=open('listquestions.json','r')
datastore = json.load(fileQuestion)
datastore=datastore['results']

datares=[]
for i in datastore :
	if len(i['incorrect_answers'])>1 and i['correct_answer'] != "True" and i['correct_answer']!="False" :
		if randint(1,2) == 1 :
			temp = {
				"question":{
					"text": re.sub('&.*;', ' ', i['question']) ,
					"question_type":"ouverte"
				},
				"reponse":{
					"correcte":i['correct_answer']
					}
			}
		else :
			temp = {
				"question":{
					"text":re.sub('&.*;', ' ', i['question']) ,
					"question_type":"qcm"
				},
				"reponse":{
					"correcte":[i['correct_answer']],
					"reponses":i['incorrect_answers']
				}
			}
			temp['reponse']['reponses'].append(temp['reponse']['correcte'][0])
	else :
		temp = {
				"question":{
				"text":re.sub('&.*;', ' ', i['question']) ,
				"question_type":"qcm"
			},
			"reponse":{
				"correcte":[i['correct_answer']],
					"reponses":["True","False"]
			}
		}
	datares.append(temp)

fileRes=open('resquestion.json','w+')
json.dump(datares, fileRes)

