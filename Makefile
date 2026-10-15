eval-refine-ticket:
	cd refine-ticket/sort-into-template && promptfoo eval
	cd refine-ticket/refine-sorted-template && promptfoo eval

eval-refine-ticket-llm-as-a-judge:
	cd refine-ticket/llm-as-a-judge && promptfoo eval

eval-ai-text-actions-structure: TASK := structure
eval-ai-text-actions-structure: eval-ai-text-actions-single

eval-ai-text-actions-erode: TASK := erode
eval-ai-text-actions-erode: eval-ai-text-actions-single

eval-ai-text-actions-translate: TASK := translate
eval-ai-text-actions-translate: eval-ai-text-actions-single

eval-ai-text-actions-style: TASK := style
eval-ai-text-actions-style: eval-ai-text-actions-single

eval-ai-text-actions:
	$(MAKE) eval-ai-text-actions-structure
	$(MAKE) eval-ai-text-actions-erode
	$(MAKE) eval-ai-text-actions-translate
	$(MAKE) eval-ai-text-actions-style

eval-ai-text-actions-single:
	promptfoo eval -c ai-text-actions/${TASK} --env-file .env -j 8 -o ${TASK}_results.json