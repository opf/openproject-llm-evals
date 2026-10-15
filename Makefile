eval-ai-text-actions-structure: TASK := structure
eval-ai-text-actions-structure: PROJECT := ai-text-actions
eval-ai-text-actions-structure: eval-single

eval-ai-text-actions-erode: TASK := erode
eval-ai-text-actions-erode: PROJECT := ai-text-actions
eval-ai-text-actions-erode: eval-single

eval-ai-text-actions-translate: TASK := translate
eval-ai-text-actions-translate: PROJECT := ai-text-actions
eval-ai-text-actions-translate: eval-single

eval-ai-text-actions-style: TASK := style
eval-ai-text-actions-style: PROJECT := ai-text-actions
eval-ai-text-actions-style: eval-single

eval-ai-text-actions-llm-as-a-judge: TASK := llm-as-a-judge
eval-ai-text-actions-llm-as-a-judge: PROJECT := ai-text-actions
eval-ai-text-actions-llm-as-a-judge: eval-single

eval-ai-text-actions:
	$(MAKE) eval-ai-text-actions-structure
	$(MAKE) eval-ai-text-actions-erode
	$(MAKE) eval-ai-text-actions-translate
	$(MAKE) eval-ai-text-actions-style

eval-single:
	promptfoo eval -c ${PROJECT}/${TASK} --env-file .env -j 12 -o ${TASK}_results.json

view:
	promptfoo view -y