# Load .env if present
ifneq (,$(wildcard ./.env))
	# Makefiles reads the .env values literally, so make sure there are no
	# unwanted white spaces, quote chars or comments in the env variable definitions
    include .env
    export
endif

eval-refine-ticket:
	cd refine-ticket/sort-into-template && promptfoo eval
	cd refine-ticket/refine-sorted-template && promptfoo eval

eval-refine-ticket-llm-as-a-judge:
	cd refine-ticket/llm-as-a-judge && promptfoo eval

eval-ai-text-actions-structure:
	cd ai-text-actions/structure && promptfoo eval -j 16

eval-ai-text-actions-translate:
	cd ai-text-actions/translate && promptfoo eval -j 16

eval-ai-text-actions-llm-as-a-judge:
	cd ai-text-actions/llm-as-a-judge && promptfoo eval -j 16

eval-ai-text-actions-erode:
	cd ai-text-actions/erode && promptfoo eval -j 16

eval-ai-text-actions-style:
	cd ai-text-actions/style && promptfoo eval -j 16

eval-ai-text-actions: eval-ai-text-actions-structure eval-ai-text-actions-translate eval-ai-text-actions-style eval-ai-text-actions-erode