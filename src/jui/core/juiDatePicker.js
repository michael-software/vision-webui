window.jui.ui = {};

(function (_this, _tools, _lang) {
    var datePicker = null;
    var datePickerCurrentText = null;
    var datePickerDay = null;
    var datePickerMonth = null;
    var datePickerYear = null;

    var daysInMonth = 31;

    var currentDate, currentMonth, currentYear;

    var callback = null;

    _this.init = function(pCallback) {
        callback = pCallback;

        if(datePicker == null) {
            datePicker = document.createElement('div');
            datePicker.className = '.juiDatePickerDialog';
            datePicker.style.display = 'none';
            datePicker.style.width = '300px';
            datePicker.style.height = '200px';
            datePicker.style.border = '1px solid black';
            datePicker.style.position = 'fixed';
            datePicker.style.top = '50%';
            datePicker.style.left = '50%';
            datePicker.style.marginTop = '-100px';
            datePicker.style.marginLeft = '-150px';
            datePicker.style.backgroundColor = '#FFFFFF';
            datePicker.style.boxShadow = '0 0 5px #000000';

            datePicker.style.userSelect = "none";
            datePicker.style.webkitUserSelect = "none";
            datePicker.style.MozUserSelect = "none";
            datePicker.setAttribute("unselectable", "on");

            datePickerCurrentText = document.createElement('div');
            datePickerCurrentText.className = '.juiDatePicker__CurrentText';
            datePickerCurrentText.style.backgroundColor = '#888888';
            datePickerCurrentText.style.padding = '5px';
            datePickerCurrentText.style.textAlign = 'center';
            datePickerCurrentText.innerHTML = _lang.get('select_date');

            var dateTable = document.createElement('table');
                dateTable.style.width = '100%';

            var rowUp = document.createElement('tr');
                var dateUpColumn = document.createElement('td');
                    dateUpColumn.innerHTML = '&#x25B2';
                    dateUpColumn.className = '.juiDatePicker__dateUp';
                    dateUpColumn.style.textAlign = 'center';
                    dateUpColumn.style.cursor = 'pointer';
                    dateUpColumn.addEventListener('click', dateUp, false);
                rowUp.appendChild(dateUpColumn);

                var monthUpColumn = document.createElement('td');
                    monthUpColumn.innerHTML = '&#x25B2';
                    monthUpColumn.className = '.juiDatePicker__monthUp';
                    monthUpColumn.style.textAlign = 'center';
                    monthUpColumn.style.cursor = 'pointer';
                    monthUpColumn.addEventListener('click', monthUp, false);
                rowUp.appendChild(monthUpColumn);

                var yearUpColumn = document.createElement('td');
                    yearUpColumn.innerHTML = '&#x25B2';
                    yearUpColumn.className = '.juiDatePicker__yearUp';
                    yearUpColumn.style.textAlign = 'center';
                    yearUpColumn.style.cursor = 'pointer';
                    yearUpColumn.addEventListener('click', yearUp, false);
                rowUp.appendChild(yearUpColumn);
            dateTable.appendChild(rowUp);

            var row1 = document.createElement('tr');
                var dateColumn = document.createElement('td');
                    datePickerDay = document.createElement('div');
                    datePickerDay.className = '.juiDatePicker__Day';
                    datePickerDay.innerHTML = '15';
                    datePickerDay.style.textAlign = 'center';
                    datePickerDay.style.cursor = 'default';
                dateColumn.appendChild(datePickerDay);
                dateColumn.style.width = '20%';
                row1.appendChild(dateColumn);


                var monthColumn = document.createElement('td');
                    datePickerMonth = document.createElement('div');
                    datePickerMonth.className = '.juiDatePicker__Month';
                    datePickerMonth.innerHTML = 'September';
                    datePickerMonth.style.textAlign = 'center';
                    datePickerMonth.style.cursor = 'default';
                monthColumn.appendChild(datePickerMonth);
                monthColumn.style.width = '50%';
                row1.appendChild(monthColumn);


                var yearColumn = document.createElement('td');
                    datePickerYear = document.createElement('div');
                    datePickerYear.className = '.juiDatePicker__Year';
                    datePickerYear.innerHTML = '2015';
                    datePickerYear.style.textAlign = 'center';
                    datePickerYear.style.cursor = 'default';
                yearColumn.appendChild(datePickerYear);
                yearColumn.style.width = '30%';
                row1.appendChild(yearColumn);
            dateTable.appendChild(row1);


            var rowDown = document.createElement('tr');
                var dateDownColumn = document.createElement('td');
                    dateDownColumn.innerHTML = '&#x25BC';
                    dateDownColumn.className = '.juiDatePicker__dateDown';
                    dateDownColumn.style.textAlign = 'center';
                    dateDownColumn.style.cursor = 'pointer';
                    dateDownColumn.addEventListener('click', dateDown, false);
                rowDown.appendChild(dateDownColumn);

                var monthDownColumn = document.createElement('td');
                    monthDownColumn.innerHTML = '&#x25BC';
                    monthDownColumn.className = '.juiDatePicker__monthDown';
                    monthDownColumn.style.textAlign = 'center';
                    monthDownColumn.style.cursor = 'pointer';
                    monthDownColumn.addEventListener('click', monthDown, false);
                rowDown.appendChild(monthDownColumn);

                var yearDownColumn = document.createElement('td');
                    yearDownColumn.innerHTML = '&#x25BC';
                    yearDownColumn.className = '.juiDatePicker__yearDown';
                    yearDownColumn.style.textAlign = 'center';
                    yearDownColumn.style.cursor = 'pointer';
                    yearDownColumn.addEventListener('click', yearDown, false);
                rowDown.appendChild(yearDownColumn);
            dateTable.appendChild(rowDown);

            var buttonOk = document.createElement('input');
            buttonOk.type = 'button';
            buttonOk.style.width = '50%';
            buttonOk.value = _lang.get('ok');
            buttonOk.addEventListener('click', _this.finish, false);

            var buttonAbort = document.createElement('input');
            buttonAbort.type = 'button';
            buttonAbort.style.width = '50%';
            buttonAbort.value = _lang.get('abort');
            buttonAbort.addEventListener('click', _this.abort, false);


            datePicker.appendChild(datePickerCurrentText);

            datePicker.appendChild(dateTable);

            datePicker.appendChild(buttonOk);
            datePicker.appendChild(buttonAbort);

            document.body.appendChild(datePicker);
        }

        datePicker.style.display = 'block';
    };

    _this.setDate = function(timestamp) {
        var dateDate = new Date(timestamp*1000);

        daysInMonth = _tools.getDaysInMonth(dateDate.getFullYear(), dateDate.getMonth());

        currentDate = dateDate.getDate();
        currentMonth = dateDate.getMonth();
        currentYear = dateDate.getFullYear();

        datePickerDay.innerHTML = currentDate;
        datePickerMonth.innerHTML = _tools.getMonthName(currentMonth);
        datePickerYear.innerHTML = currentYear;
    };

    var dateUp = function() {
        currentDate++;

        if(currentDate > daysInMonth) {
            currentDate = 1;
            monthUp();
        }

        datePickerDay.innerHTML = currentDate;
    };

    var dateDown = function() {
        currentDate--;

        if(currentDate <= 0) {
            monthDown();
            currentDate = daysInMonth;
        }

        datePickerDay.innerHTML = currentDate;
    };


    var monthUp = function() {
        currentMonth++;

        if(currentMonth > 11) {
            currentMonth = 0;
            yearUp();
        }

        daysInMonth = _tools.getDaysInMonth(currentYear, currentMonth);

        datePickerMonth.innerHTML = _tools.getMonthName(currentMonth);
    };

    var monthDown = function() {
        currentMonth--;

        if(currentMonth < 0) {
            currentMonth = 11;
            yearDown();
        }

        daysInMonth = _tools.getDaysInMonth(currentYear, currentMonth);

        datePickerMonth.innerHTML = _tools.getMonthName(currentMonth);
    };


    var yearUp = function() {
        currentYear++;

        daysInMonth = _tools.getDaysInMonth(currentYear, currentMonth);

        datePickerYear.innerHTML = currentYear;
    };

    var yearDown = function() {
        currentYear--;

        daysInMonth = _tools.getDaysInMonth(currentYear, currentMonth);

        datePickerYear.innerHTML = currentYear;
    };

    _this.abort = function() {
        if(datePicker != null)
            datePicker.style.display = 'none';
    };

    _this.finish = function() {
        var date = new Date();
        date.setDate(currentDate);
        date.setMonth(currentMonth);
        date.setFullYear(currentYear);

        if(!_tools.empty(callback) && _tools.isFunction(callback))
            callback( Math.round(date.getTime()/1000) );

        _this.abort();
    }
})(window.jui.ui.datePicker = {}, window.jui.tools, window.jui.lang);