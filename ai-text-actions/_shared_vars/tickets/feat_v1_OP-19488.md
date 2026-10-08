**As** an admin  
**I want to** view the version and location of all active worker processes    
**so that** I can diagnose version mismatches and identify deviant workers.

----

We encountered an issue today with a customer having a packaged installation running OpenProject 17.5.0, and the jobs were failing with a `NameError`, showing that the worker could not load the job.

After investigating, we found out that another worker process running OpenProject 17.2.x was running on another host and was connected to the same database.

Both the 17.5 and the 17.2 workers were processing jobs. The one running 17.5 was running correctly, the one running 17.2 was marking a lot of job as failed discarded because it could not load jobs like `ProjectIdentifiers::ConvertProjectToSemanticIdsJob`.

We detected it through the "Processes" tab of the good_job admin interface. We saw the two worker processes running on different machines.

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/921873/content">

That would be helpful to have this "Processes"&quot;" information somewhere in OpenProject to help diagnosis.

**Acceptance criteria**

*   The number of workers processes and if they are all running the latest version is reported somewhere in OpenProject.
    
    *   It could be in /health_checks/xxx endpoints
        
    *   It could be in Administration > Information page
        
    *   or somewhere else.
        
*   The information needed to diagnose and upgrade or terminate deviant worker processes is available:
    
    *   are all workers up-to-date (if possible to get this information)
        
    *   which version is running (if possible)
        
    *   where is the worker located
        

**Technical notes**

*   Active processes can be fetched with `GoodJob::Process.active`
    
*   `GoodJob::Process` instances have a `state` with useful information: `process.state.slice("hostname", "pid", "proctitle").inspect`
    
*   We can probably extend the state with custom information:
    

```ruby
# config/initializers/good_job_process_version.rb
ActiveSupport.on_load(:good_job_process) do
  # self is GoodJob::Process here
  singleton_class.prepend(Module.new do
    def process_state
      super.merge(openproject_version: OpenProject::VERSION::STRING)
    end
  end)
end
```
