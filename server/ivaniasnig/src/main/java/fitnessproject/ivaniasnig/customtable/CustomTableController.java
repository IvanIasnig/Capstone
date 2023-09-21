package fitnessproject.ivaniasnig.customtable;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/customtables")
public class CustomTableController {
    
    @Autowired
    private CustomTableService customTableService;

    @GetMapping
    public List<CustomTable> getAllCustomTables() {
        return customTableService.getAllCustomTables();
    }


    @PostMapping
    public CustomTable createCustomTable(@RequestBody CustomTable customTable, @RequestParam UUID userId) {
        return customTableService.saveCustomTable(customTable, userId);
    }

    @PostMapping("/{id}/entries")
    public CustomTable addEntryToTable(@PathVariable UUID id, @RequestBody CustomEntry newEntry) {
        return customTableService.addEntry(id, newEntry);
    }

    @DeleteMapping("/{id}")
    public String deleteCustomTable(@PathVariable UUID id) {
        customTableService.deleteCustomTable(id);
        return "Deleted CustomTable with id: " + id;
    }
}
