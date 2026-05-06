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